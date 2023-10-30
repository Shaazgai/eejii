import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import type { UseFormReturn } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  // FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import type { eventSchema } from '@/lib/validation/event-schema';

const EventFields = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventSchema>>;
}) => {
  const [roleNumber, setRoleNumber] = useState<number>(0);
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  const Editor = dynamic(() => import('../ckeditor'), { ssr: false });
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (form.getValues('roles')) {
      setRoleNumber(form.getValues('roles')?.length || 0);
    }
  }, [form.getValues('roles')]);
  function handleAddRole(value: number) {
    if (value + roleNumber <= 0) {
      setRoleNumber(0);
    } else {
      setRoleNumber(roleNumber + value);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            1
          </div>
          <div className="relative top-3 m-auto h-[180px] w-[1px] border border-brand400"></div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="h-[148px] w-[968px] space-y-5">
              <FormLabel className="text-2xl">
                Арга хэмжээ зохион байгуулах байршил
              </FormLabel>
              <FormItem className="w-full rounded-2xl border bg-white px-4 pb-4 pt-6">
                <FormLabel>
                  Арга хэмжээ зохион байгуулагдах газрын байршил эсвэл линкийг
                  оруулна уу?
                </FormLabel>
                <Input
                  placeholder="байршлыг оруулна уу?"
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  {...field}
                />
                <FormMessage />
                <FormDescription>бүтэн хаягыг оруулна уу</FormDescription>
              </FormItem>
            </div>
          )}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            2
          </div>
          <div className="relative top-3 m-auto h-[135px] w-[1px] border border-brand400"></div>
        </div>
        <div className="h-[173px] w-[968px] space-y-5">
          <FormLabel className="text-2xl">Ажлын үргэлжлэх хугацаа</FormLabel>
          <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
            <FormField
              name="startTime"
              control={form.control}
              render={({ field }) => {
                const handleDateChange = (date: Date) => {
                  form.setValue('startTime', date, { shouldValidate: true });
                };
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Start date</FormLabel>
                    <DatePicker
                      id="exampleFormControlTextarea2"
                      className="w-full rounded-full border px-3 py-2 text-sm ring-0 focus:outline-none"
                      // locale="mn"
                      placeholderText="Өдөр сонгох"
                      dateFormat="yyyy-MM-dd H:mm "
                      timeInputLabel="Time:"
                      disabledKeyboardNavigation
                      showTimeSelect
                      selected={
                        field.value ? moment(field.value).toDate() : null
                      }
                      value={
                        field.value
                          ? moment(field.value).toDate().toISOString()
                          : ''
                      }
                      onKeyDown={e => {
                        e.preventDefault();
                      }}
                      onChange={handleDateChange}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="endTime"
              control={form.control}
              render={({ field }) => {
                const handleDateChange = (date: Date) => {
                  form.setValue('endTime', date, { shouldValidate: true });
                };
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>End date</FormLabel>
                    <DatePicker
                      id="exampleFormControlTextarea2"
                      className="w-full rounded-full border px-3 py-2 text-sm ring-0 focus:outline-none"
                      // locale="mn"
                      placeholderText="Өдөр сонгох"
                      dateFormat="yyyy-MM-dd H:mm "
                      timeInputLabel="Time:"
                      disabledKeyboardNavigation
                      showTimeSelect
                      selected={
                        field.value ? moment(field.value).toDate() : null
                      }
                      onKeyDown={e => {
                        e.preventDefault();
                      }}
                      value={
                        field.value
                          ? moment(field.value).toDate().toISOString()
                          : ''
                      }
                      onChange={handleDateChange}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            3
          </div>
          <div className="relative top-3 m-auto h-[140px] w-[1px] border border-brand400"></div>
        </div>
        <FormField
          control={form.control}
          name="requiredTime"
          render={({ field }) => (
            <div className="h-[187px] w-[968px] space-y-5">
              <FormLabel className="text-2xl">Арга хэмжээний нэр</FormLabel>
              <FormItem className="w-full rounded-2xl border bg-white px-4 py-8">
                <Input
                  placeholder="НЭР"
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  {...field}
                />
                <FormDescription>
                  40 тэмдэгтэд багтаан бичнэ үү!
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </div>
      {/* <FormField */}
      {/*   control={form.control} */}
      {/*   name="image" */}
      {/*   render={({ field }) => ( */}
      {/*   )} */}
      {/* /> */}
      {/* <FormField */}
      {/*   control={form.control} */}
      {/*   name="mainCategory" */}
      {/*   render={({ field }) => ( */}
      {/*     <FormItem className="w-full"> */}
      {/*       <FormLabel>Category</FormLabel> */}
      {/*       <Select */}
      {/*         onValueChange={value => { */}
      {/*           field.onChange(value); */}
      {/*         }} */}
      {/*         value={field.value} */}
      {/*         defaultValue={field.value} */}
      {/*       > */}
      {/*         <FormControl> */}
      {/*           <SelectTrigger */}
      {/*             disabled={!isCategoryFetching && categories ? false : true} */}
      {/*           > */}
      {/*             <SelectValue placeholder="Select Category" /> */}
      {/*             {!isCategoryFetching && categories ? ( */}
      {/*               <SelectValue placeholder="Select Category" /> */}
      {/*             ) : ( */}
      {/*               <Loader2 className="animate-spin" /> */}
      {/*             )} */}
      {/*           </SelectTrigger> */}
      {/*         </FormControl> */}
      {/*         <SelectContent className="max-h-[50vh]"> */}
      {/*           {!isCategoryFetching && categories ? ( */}
      {/*             categories.map(category => { */}
      {/*               console.log(isCategoryFetching); */}
      {/*               return ( */}
      {/*                 <SelectItem value={category.id} key={category.id}> */}
      {/*                   {category.name} */}
      {/*                 </SelectItem> */}
      {/*               ); */}
      {/*             }) */}
      {/*           ) : ( */}
      {/*             <span>Loading</span> */}
      {/*           )} */}
      {/*         </SelectContent> */}
      {/*       </Select> */}
      {/*       <FormMessage /> */}
      {/*     </FormItem> */}
      {/*   )} */}
      {/* /> */}

      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            4
          </div>
          <div className="relative top-3 m-auto h-[370px] w-[1px] border border-brand400"></div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <div className="h-[327px] w-[964px] space-y-5">
              <FormLabel className="text-2xl">
                Арга хэмжээний дэлгэрэнгүй
              </FormLabel>
              <FormItem className="rounded-2xl border bg-white px-4 py-8">
                {/* <FormLabel>Нийт хэмжээ</FormLabel> */}
                <Input
                  placeholder="НИЙТ ХЭМЖЭЭ ₮"
                  {...field}
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  type="number"
                  onChange={event => field.onChange(+event.target.value)}
                />
                <Editor {...field} editorLoaded={editorLoaded} />
                <FormDescription>
                  {/* You can <span>@mention</span> other users and organizations. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            5
          </div>
          <div className="relative top-3 m-auto h-[280px] w-[1px] border border-brand400"></div>
        </div>
        <div className="h-[320px] w-[968px] space-y-5">
          <FormLabel className="text-2xl">
            Сайн дурын ажилтны мэдээлэл
          </FormLabel>
          <div className="flex flex-col justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
            {Array.from(Array(roleNumber).keys()).map((number, i) => (
              <div className="flex flex-row gap-2" key={i}>
                <FormItem className="w-full" key={i}>
                  <Input
                    placeholder="Role name"
                    className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                    {...form.register(`roles.${number}.name`)}
                  />
                  <FormMessage />
                </FormItem>
                <FormItem className="w-full" key={i + 1}>
                  <Input
                    type="number"
                    className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                    placeholder="Numbers of volunteers in role"
                    {...form.register(`roles.${number}.number`)}
                  />
                  <FormMessage />
                </FormItem>
              </div>
            ))}
            <div className="space-x-5">
              <Button
                type="button"
                variant={'destructive'}
                onClick={() => {
                  handleAddRole(-1);
                }}
              >
                Delete role
              </Button>
              <Button
                type="button"
                variant={'outline'}
                onClick={() => {
                  handleAddRole(1);
                }}
              >
                Add role
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            6
          </div>
          <div className="relative top-3 m-auto h-[150px] w-[1px] border border-brand400"></div>
        </div>
        <div className="h-[190px] w-[968px] space-y-5">
          <FormLabel className="text-2xl">Холбоо барих</FormLabel>
          <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
            <FormField
              name="contact.phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                    placeholder="Phone"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contact.email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <Input
                    className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                    placeholder="Email"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[30px]">
          <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
            7
          </div>
          <div className="relative top-3 m-auto h-[185px] w-[1px] border border-brand400"></div>
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <div className="h-[232px] w-[963px] space-y-5">
              <FormLabel className="text-2xl">Ангилал</FormLabel>
              <FormItem className="rounded-2xl border bg-white px-4 py-8">
                <FormLabel>
                  Төсөл аль ангилалд хамгийн сайн тохирох вэ?
                </FormLabel>
                <Input
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  placeholder="Email"
                  {...field}
                />
                <FormDescription>
                  end ali turuld angilagdaj bgaa button hiine deed taliin
                  input-iig ustgana.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default EventFields;
