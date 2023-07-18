import type { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { WebhookRequiredHeaders } from 'svix';
import { Webhook } from 'svix';

import { prisma } from '@/server/db';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(req: Request) {
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const webhook = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = webhook.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({}, { status: 400 });
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
  return NextResponse.json({}, { status: 200 });
}

type EventType = 'user.created' | 'user.updated' | '*';
type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
