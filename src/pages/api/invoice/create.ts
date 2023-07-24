import type { NextApiRequest, NextApiResponse } from 'next';

// import { verify, generate } from '@/lib/paymentProvider';
import { generate } from '@/lib/paymentProvider';
import { prisma } from '@/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, fundId } = req.body;
  // const user = await prisma.user.findUniqueOrThrow({
  //   where: { externalId: userId },
  // });
  const donation = await prisma.donation.create({
    data: {
      User: { connect: { externalId: userId } },
      Fundraising: { connect: { id: fundId } },
      amount: 0,
      Payment: {
        create: {
          status: 'PENDING',
          amount: 0,
          invoiceId: 'eeji',
        },
      },
    },
  });

  const invoice = await generate({
    invoiceNo: donation.id,
    amount: 10,
    expireAt: undefined,
  });
  console.log(JSON.stringify(invoice));
  return res.status(200).json({ message: invoice });
}
