import type { NextApiRequest, NextApiResponse } from 'next';

// import { verify, generate } from '@/lib/paymentProvider';
import { generate } from '@/lib/paymentProvider';
import { prisma } from '@/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, fundId, amount } = req.body;
  // const user = await prisma.user.findUniqueOrThrow({
  //   where: { externalId: userId },
  // });
  console.log(amount);
  const donation = await prisma.donation.create({
    data: {
      User: { connect: { externalId: userId } },
      Fundraising: { connect: { id: fundId } },
      amount: amount,
      Payment: {
        create: {
          status: 'PENDING',
          amount: amount,
        },
      },
    },
  });

  const invoice = await generate({
    invoiceNo: donation.id,
    amount: amount,
    expireAt: undefined,
  });
  const payment = await prisma.payment.update({
    where: { donationId: donation.id },
    data: {
      invoiceId: invoice.invoice_id,
      status: 'AWAITING_PAYMENT',
      details: invoice,
    },
  });

  // console.log(JSON.stringify(invoice));
  return res.status(200).json(payment);
}
