import type { NextApiRequest, NextApiResponse } from 'next';

import { verify } from '@/lib/paymentProvider';
import { prisma } from '@/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paymentId } = req.body;
  const payment = await prisma.payment.findUniqueOrThrow({
    where: { id: paymentId },
  });
  const invoiceRes = await verify({ invoiceId: payment.invoiceId as string });

  if (invoiceRes.code === 'success') {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'PAID' },
    });
    return res.status(200).json({ message: 'PAID' });
  } else {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'UNPAID',
      },
    });
    return res.status(200).json({ code: 'UNPAID' });
  }
}
