import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';

const FundraisingFields = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof fundraisingSchema>>;
}) => {
  return (
    <>
      <div className="flex">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-[30px]">
              <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                1
              </div>
              <div className="relative top-3 m-auto h-[115px] w-[1px] border border-brand400"></div>
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="h-[154px] w-[968px] space-y-5">
                  <FormLabel className="text-2xl">Төслийн нэр</FormLabel>
                  <FormItem className="w-full rounded-2xl border bg-white px-4 py-8">
                    <Input
                      placeholder="Төслийнхөө нэрийг оруулаарай"
                      className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <div>
            <div className="flex gap-4">
              <div className="w-[30px]">
                <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                  2
                </div>
                <div className="relative top-3 m-auto h-[115px] w-[1px] border border-brand400"></div>
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <div className="h-[154px] w-[968px] space-y-5">
                    <FormLabel className="text-2xl">Линк</FormLabel>
                    <FormItem className="w-full rounded-2xl border bg-white px-4 py-8">
                      <Input
                        placeholder="Сонгон шалгаруулах форм линк оруулна уу"
                        className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-[30px]">
              <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                3
              </div>
              <div className="relative top-3 m-auto h-[215px] w-[1px] border border-brand400"></div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="h-[154px] w-[968px]  space-y-5">
                  <FormLabel className="text-2xl">
                    Төслийн дэлгэрэнгүй
                  </FormLabel>
                  <FormItem className="rounded-2xl border bg-white px-4 py-8">
                    <Input
                      placeholder="НИЙТ ХЭМЖЭЭ ₮"
                      {...field}
                      className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                      type="number"
                      onChange={event => field.onChange(+event.target.value)}
                    />
                    <FormDescription>
                      <span className="uppercase">
                        {' '}
                        Та үйл ажиллагааныхаа талаар тайлбарлана уу?
                      </span>
                      {/* You can <span>@mention</span> other users and organizations. */}
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Арга хэмжээний талаарх дэлгэрэнгүй бичнэ үү?"
                        className="resize-none "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
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
          {/* <FormField */}
          {/*   control={form.control} */}
          {/*   name="location" */}
          {/*   render={({ field }) => ( */}
          {/*     <div className="space-y-2"> */}
          {/*       <FormLabel className="text-2xl">Location</FormLabel> */}
          {/*       <FormItem className="rounded-2xl border bg-white px-4 py-8"> */}
          {/*         <FormControl> */}
          {/*           <Textarea */}
          {/*             placeholder="Where will event be hold" */}
          {/*             className="resize-none" */}
          {/*             {...field} */}
          {/*           /> */}
          {/*         </FormControl> */}
          {/*         <FormDescription> */}
          {/*           You can <span>@mention</span> other users and organizations. */}
          {/*         </FormDescription> */}
          {/*         <FormMessage /> */}
          {/*       </FormItem> */}
          {/*     </div> */}
          {/*   )} */}
          {/* /> */}

          <div className="flex gap-4">
            <div className="w-[30px]">
              <div className=" mt-4 h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                4
              </div>
              <div className="relative top-3 m-auto h-[155px] w-[1px] border border-brand400"></div>
            </div>
            <div className=" w-[968px] space-y-5 pt-4">
              <FormLabel className="text-2xl">Холбоо барих</FormLabel>
              <div className="gap-5 rounded-3xl border bg-white px-4 py-8">
                <span>
                  Энэхүү үйл ажиллагаан холбогдох хүний талаар мэдээллйиг
                  оруулаарай
                </span>
                <div className="flex  flex-row justify-around pt-5">
                  <FormField
                    name="contact.phone"
                    render={({ field }) => (
                      <FormItem className="w-[427px]">
                        {/* <FormLabel>Холбогдох дугаар</FormLabel> */}
                        <Input
                          className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                          placeholder="Холбогдох дугаар"
                          {...field}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="contact.email"
                    render={({ field }) => (
                      <FormItem className="w-[427px]">
                        {/* <FormLabel>И-мэйл хаяг</FormLabel> */}
                        <Input
                          className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                          placeholder="И-мэйл хаяг"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* //donate */}
          {/* <div className="h-[221px] w-[968px] space-y-2">
            <FormLabel className="text-2xl">Хандив</FormLabel>
            <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
              
              <FormField
                name="currentAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Одоогийн хандивын хэмжээ</FormLabel>
                    <Input
                      placeholder="Current Amount"
                      {...field}
                      className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                      onChange={event => field.onChange(+event.target.value)}
                      type="number"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}
          <div className="flex gap-4">
            <div className="w-[30px]">
              <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                5
              </div>
              <div className="relative top-3 m-auto h-[130px] w-[1px] border border-brand400"></div>
            </div>
            <div className="h-[173px] w-[968px] space-y-5">
              <FormLabel className="text-2xl">
                Арга хэмжээ эхлэх болон дуусах хугацаа
              </FormLabel>
              <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
                <FormField
                  name="startTime"
                  control={form.control}
                  render={({ field }) => {
                    const handleDateChange = (date: Date) => {
                      form.setValue('startTime', date, {
                        shouldValidate: true,
                      });
                    };
                    return (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel>Эхлэх огноо</FormLabel>
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
                        <FormLabel>Дуусах огноо</FormLabel>
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
        </div>
      </div>
    </>
  );
};

export default FundraisingFields;
