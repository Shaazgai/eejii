import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { format } from 'date-fns';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Toaster } from '@/components/ui/toaster';
import type { ContactType, FundraisingType, PaymentType } from '@/lib/types';
import { priceFormatter } from '@/lib/utils/price';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
const FundDetail = ({
  fund,
  actionButton,
}: {
  fund: FundraisingType;
  actionButton: ReactNode;
}) => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [payment, setPayment] = useState<PaymentType>();
  const { toast } = useToast();

  const { userId, isLoaded } = useAuth();

  async function handleDonate(event: FormEvent) {
    event.preventDefault();
    if (!isLoaded) alert('Not logged in');
    try {
      const res = await axios.post('/api/invoice/create', {
        userId: userId,
        fundId: fund?.id as string,
        amount: selectedAmount,
      });

      if (res.status === 200) {
        setPayment(res.data);
      }
    } catch (error) {
      console.error('Error during donation:', error);
    }
  }

  async function handleVerify(paymentId: string) {
    const res = await axios.post('/api/invoice/verify', {
      paymentId: paymentId,
    });
    if (res.status === 200 && res.data.message === 'PAID') {
      toast({
        title: 'Successfully paid',
        description: 'Thanks for donation',
      });
      setPayment({} as PaymentType);
    } else {
      toast({
        title: 'Not paid',
      });
    }
  }
  console.log(selectedAmount);
  return (
    <div className="">
      <div className="mb-3 flex items-center justify-between gap-5 border-b-2 border-dashed pb-2">
        <div className="mb-3 flex items-center gap-5">
          <Button className="h-12 w-12 rounded-full p-3" variant={'outline'}>
            <ArrowLeft className="h-12 w-12" />
          </Button>
          <div>
            <h1 className=" text-3xl  font-bold">{fund.title}</h1>
            <div className="flex gap-3">
              <span>{format(fund.startTime, 'PPP HH:mm')}</span>---
              <span>{format(fund.endTime, 'PPP HH:mm')}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">{actionButton}</div>
      </div>
      <div className="flex gap-10">
        <div className="w-[63%]	space-y-5">
          <div className="overflow-hidden rounded-lg">
            <Image
              className="w-full object-cover object-center"
              src={'/placeholder.webp'}
              width={500}
              height={500}
              alt="detail"
            />
          </div>
          <div>
            <h3 className="text-xl">Description</h3>
            {fund.description}
          </div>
        </div>
        <div className="grow">
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Donate</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers
                          <div className="mt-3">
                            {!payment ? (
                              <form onSubmit={handleDonate}>
                                <div className="mb-3 flex gap-2">
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setSelectedAmount(100);
                                    }}
                                    className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                                  >
                                    100
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setSelectedAmount(200);
                                    }}
                                    className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                                  >
                                    200
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setSelectedAmount(300);
                                    }}
                                    className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                                  >
                                    300
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setSelectedAmount(400);
                                    }}
                                    className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                                  >
                                    400
                                  </Button>
                                </div>

                                <Input
                                  onChange={e => {
                                    setSelectedAmount(
                                      parseInt(e.target.value) as number
                                    );
                                  }}
                                  type="number"
                                  placeholder="Donate other amount ..."
                                  value={selectedAmount}
                                />

                                <div className="mt-3 flex justify-end">
                                  <Button type="submit">Donate</Button>
                                </div>
                              </form>
                            ) : (
                              <div>
                                <img
                                  src={`data:image/png;base64,${payment.details?.qr_image}`}
                                  className="w-full border"
                                  alt="qr"
                                />
                                <Button
                                  onClick={() => {
                                    handleVerify(payment.id);
                                  }}
                                >
                                  Verify
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="">
                  <div className="flex justify-between">
                    <span className="flex flex-col">
                      <span>Raised</span>
                      <strong className="text-xl">
                        {priceFormatter.format(fund.goalAmount)}
                      </strong>
                    </span>
                    <span className="flex flex-col">
                      <span>Goal</span>
                      <strong className="text-xl">
                        {priceFormatter.format(fund.goalAmount)}
                      </strong>
                    </span>
                  </div>
                  <Progress
                    value={(fund.currentAmount * 100) / (fund.goalAmount + 100)}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b">
                <h3 className="text-xl">Donations ({fund.Donation.length})</h3>
              </CardHeader>
              <CardContent>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {fund.Donation &&
                    fund.Donation.slice(0, 10)?.map(donation => {
                      return (
                        <li
                          className="rounded px-3 py-3 sm:py-4"
                          key={donation.id}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex flex-col">
                              <div className="flex items-center gap-2">
                                {donation.isPublicName ? (
                                  <Image
                                    className="aspect-square rounded-full object-cover"
                                    alt="a"
                                    src={'/placeholder.webp'}
                                    width={35}
                                    height={35}
                                  />
                                ) : (
                                  <Image
                                    className="aspect-square rounded-full object-cover"
                                    alt="a"
                                    src={'/placeholder.webp'}
                                    width={35}
                                    height={35}
                                  />
                                )}
                                <div className="flex flex-col">
                                  <strong className="text-md">
                                    {donation.isPublicName
                                      ? donation.User?.username
                                      : 'Unknown'}
                                  </strong>
                                  <span className="text-sm">
                                    {format(donation.createdAt, 'PPP')}
                                  </span>
                                </div>
                              </div>
                            </span>
                            <span>
                              {priceFormatter.format(donation.amount)}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                {/* {fund.} */}
                Owner
              </CardHeader>
              <CardContent>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="rounded px-3 py-2 sm:py-2">
                    {(fund.contact as ContactType).primary_phone && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                          <Phone />
                        </span>
                        <span>
                          {(fund.contact as ContactType).primary_phone}
                        </span>
                      </div>
                    )}
                  </li>
                  <li className="rounded px-3 py-2 sm:py-2">
                    {(fund.contact as ContactType).secondary_phone && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                          <Phone />
                        </span>
                        <span>
                          {(fund.contact as ContactType).secondary_phone}
                        </span>
                      </div>
                    )}
                  </li>
                  <li className="rounded px-3 py-2 sm:py-2">
                    {(fund.contact as ContactType).email_1 && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                          <Mail />
                        </span>
                        <span>{(fund.contact as ContactType).email_1}</span>
                      </div>
                    )}
                  </li>
                  <li className="rounded px-3 py-2 sm:py-2">
                    {(fund.contact as ContactType).email_2 && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-2">
                          <Mail />
                        </span>
                        <span>{(fund.contact as ContactType).email_2}</span>
                      </div>
                    )}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default FundDetail;
