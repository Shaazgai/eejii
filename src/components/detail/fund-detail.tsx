import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
const FundDetail = ({ fund }: { fund: FundraisingType }) => {
  const { mutate } = api.fundraising.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ fundraisingId: fund?.id as string });
  }
  const { userId, isLoaded } = useAuth();
  async function handleDonate() {
    if (!isLoaded) alert('Not logged in');
    const res = await axios.post('/api/invoice/create', {
      userId: userId,
      fundId: fund?.id as string,
    });
  }
  return (
    <div className="container">
      <div className="flex gap-10">
        <div className="w-[500px] space-y-5">
          <Image
            className="aspect-square w-full object-cover object-center"
            src={'/placeholder.webp'}
            width={500}
            height={500}
            alt="detail"
          />
          <div className="">
            <div className="flex  justify-between gap-10">
              <div className="grow rounded bg-indigo-200 px-5 py-3">
                Current amount:
                <br />
                <span className="font-semibold">
                  {fund.currentAmount.toString()}
                </span>
              </div>
              <div className="grow rounded bg-indigo-200 px-5 py-3">
                Goal amount: <br />
                <span className="font-semibold">
                  {fund.goalAmount.toString()}
                </span>
              </div>
            </div>
            <div>
              <ul
                role="list"
                className="mt-4 divide-y divide-gray-200 dark:divide-gray-700"
              >
                {fund.Donation &&
                  fund.Donation?.map(donation => {
                    return (
                      <li
                        className="rounded bg-slate-200 px-3 py-3 sm:py-4"
                        key={donation.id}
                      >
                        <div className="flex justify-between">
                          <span>{donation.User?.username}</span>
                          <span>{donation.amount.toString()}</span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <Dialog>
                <DialogTrigger
                  className="rounded bg-indigo-200 px-2"
                  // onClick={handleDonate}
                >
                  Donate
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                      {/* <Image
                        className="aspect-square w-full object-cover object-center"
                        src={'/placeholder.webp'}
                        width={250}
                        height={250}
                        alt="detail"
                      /> */}
                      <div className="mt-3">
                        <form>
                          <div className="mb-3 flex gap-2">
                            <Input
                              type="button"
                              value={5000}
                              className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                            />
                            <Input
                              type="button"
                              value={10000}
                              className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                            />
                            <Input
                              type="button"
                              value={10000}
                              name="donate"
                              className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                            />
                            <Input
                              type="button"
                              value={20000}
                              className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-indigo-800"
                            />
                          </div>

                          <Input />
                          <div className="mt-3 flex justify-end">
                            <Button type="submit">Donate</Button>
                          </div>
                        </form>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="grow">
          <div className="mb-3 border-b-2 border-dashed pb-2 text-2xl font-bold">
            {fund.title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" onClick={handleSendRequest}>
          Send join request
        </Button>
      </div>
    </div>
  );
};

export default FundDetail;
