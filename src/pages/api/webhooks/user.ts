import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import { Webhook } from 'svix';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = await req.body;
  const headersList = req.headers;

  const heads = {
    'svix-id': headersList['svix-id'],
    'svix-timestamp': headersList['svix-timestamp'],
    'svix-signature': headersList['svix-signature'],
  };
  console.log('🚀 ~ file: user.ts:20 ~ handler ~ heads:', heads);
  const webhook = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = webhook.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.log((err as Error).message);

    return res.status(400).json({ message: 'Error' });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data;
    console.log(id);
    console.log(attributes);

    await prisma.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        username: attributes.first_name + ' ' + attributes.last_name,
        email:
          Array.isArray(attributes.email_addresses) &&
          attributes.email_addresses[0].email_address,
        // password: id as string,
      },
      update: {
        username: attributes.first_name + ' ' + attributes.last_name,
        email:
          Array.isArray(attributes.email_addresses) &&
          attributes.email_addresses[0].email_address,
      },
    });
  }
  return res.status(200).json({ message: 'success' });
}

type EventType = 'user.created' | 'user.updated' | '*';
type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};
