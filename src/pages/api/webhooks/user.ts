import type { IncomingHttpHeaders } from 'http';
// import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import { prisma } from '@/server/db';

const webhookSecret = process.env.WEBHOOK_SECRET || '';



export default async function handler(req: Request, res: Response) {
  const payload = await req.body;
  // const headersList = headers()
  // const requestHeaders = new Headers(req.headers);
  const headersList = req.headers

  const heads = {
    'svix-id': headersList['svix-id'],
    'svix-timestamp': headersList['svix-timestamp'],
    'svix-signature': headersList['svix-signature'],
  };
  console.log("🚀 ~ file: user.ts:20 ~ handler ~ heads:", heads)
  const webhook = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = webhook.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.log((err as Error).message);
    return res.json({}, { status: 400 });
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
  return res.json(heads);
}

type EventType = 'user.created' | 'user.updated' | '*';
type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

// export const GET = handler;
// export const POST = handler;
// export const PUT = handler;
