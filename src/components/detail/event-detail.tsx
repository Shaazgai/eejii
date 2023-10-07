import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import type { EventWithOwner } from '@/lib/types';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';

const EventDetail = ({
  event,
  actionButton,
}: {
  event: EventWithOwner;
  actionButton: ReactNode;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-5  pb-2">
        <div className="mb-3 flex items-center gap-5">
          <Button
            onClick={() => router.back()}
            className="h-12 w-12 rounded-full p-3"
            variant={'outline'}
          >
            <ArrowLeft className="h-12 w-12" />
          </Button>
          <div>
            <h1 className=" text-3xl  font-semibold">{event.title}</h1>
          </div>
        </div>
        <div className="flex justify-center">{actionButton}</div>
      </div>
      <div className="flex gap-10">
        <div className="w-[63%]	space-y-5">
          <div className="overflow-hidden rounded-lg">
            <Image
              className="max-h-[450px] w-full object-cover object-center"
              src={'/placeholder.webp'}
              width={500}
              height={500}
              alt="detail"
            />
          </div>
          <div>
            {/* {event.CategoryEvent && */}
            {/*   event?.CategoryEvent.map(categoryEvent => { */}
            {/*     const category = categoryEvent?.Category; */}
            {/*     return ( */}
            {/*       <Button */}
            {/*         variant={'outline'} */}
            {/*         size={'sm'} */}
            {/*         type="button" */}
            {/*         onClick={() => { */}
            {/*           router.push(`/explore/category/${category?.id}`); */}
            {/*         }} */}
            {/*         key={category?.id} */}
            {/*         className="rounded-full" */}
            {/*       > */}
            {/*         {category?.name} */}
            {/*       </Button> */}
            {/*     ); */}
            {/*   })} */}
          </div>
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">Description</h3>
              {event.description}
            </div>
            <div>
              <h3 className="text-xl font-semibold">Roles</h3>
              <ul className="ms-5 list-disc">
                {event?.roles &&
                  Object.values(event?.roles).map((role, i) => (
                    <li key={i}>{role.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="grow space-y-5">
          <Card>
            <CardHeader className="flex items-start pb-0">
              {/* Organized by: */}
              <div className="flex items-center gap-2 rounded-full border p-1 pe-3">
                <Image
                  className="aspect-square rounded-full object-cover"
                  alt="a"
                  src={'/placeholder.webp'}
                  width={30}
                  height={30}
                />
                <span className="">{event.Owner?.organization}</span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Organized by: */}
              <ul
                role="list"
                className="mt-4 divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="flex justify-between rounded  py-3 sm:py-2">
                  <span>Organization:</span> {event.Owner?.organization}
                </li>
                <li className="flex justify-between rounded py-1 sm:py-2">
                  <span>Email:</span> {event.Owner?.email}
                </li>
                <li className="flex justify-between rounded py-1 sm:py-2">
                  <span>Phone number:</span> {event.Owner?.phoneNumber}
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              {event?.startTime && event?.endTime && (
                <div className="flex gap-3">
                  <span>
                    {format(event?.startTime as unknown as Date, 'PPP HH:mm')}
                  </span>
                  -
                  <span>
                    {format(event?.endTime as unknown as Date, 'PPP HH:mm')}
                  </span>
                </div>
              )}
              <p>{event.requiredTime}</p>
            </CardHeader>
          </Card>
          <Card>
            {/* <CardHeader> */}
            {/*   Attending */}
            {/*   <span> */}
            {/*     {event.EventPartner?.filter(ep => ep.status === 'approved') */}
            {/*       .length + */}
            {/*       event.EventSupporter?.filter(es => es.status === 'approved') */}
            {/*         .length > */}
            {/*       0 && ( */}
            {/*       <span> */}
            {/*         Collaborating with{' '} */}
            {/*         {event.EventPartner?.filter(ep => ep.status === 'approved') */}
            {/*           .length + */}
            {/*           event.EventSupporter?.filter( */}
            {/*             es => es.status === 'approved' */}
            {/*           ).length} */}
            {/*         {' partners and supporters'} */}
            {/*       </span> */}
            {/*     )} */}
            {/*     {event.EventVolunteer?.filter(ev => ev.status === 'approved') */}
            {/*       .length > 0 && ( */}
            {/*       <span> */}
            {/*         { */}
            {/*           event.EventVolunteer?.filter( */}
            {/*             ev => ev.status === 'approved' */}
            {/*           ).length */}
            {/*         } */}
            {/*       </span> */}
            {/*     )} */}
            {/*   </span> */}
            {/* </CardHeader> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
