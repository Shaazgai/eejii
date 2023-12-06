import { Loader2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import countries from 'src/data/city.json';

import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import FundraisingList from '@/components/list/fund-list';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectStatus } from '@/lib/db/enums';
import type { FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

const Donate = () => {
  const { data: categories, isFetching: isCategoryFetching } =
    api.category.getAll.useQuery({ type: 'event' });
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery({
      page: 1,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  const form = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <VolunteerLayout>
      <div className="">
        <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[300px] w-full object-cover object-center"
          alt="bg"
          src={'/images/spider.jpg'}
        />
      </div>
      <Shell>
        <div className="m-auto -translate-y-20 md:w-[800px]">
          <Card className="">
            <CardHeader className="text-3xl">
              What kind of impact are you looking to make?
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex items-end gap-5">
                    <div className="w-full">
                      <FormItem className="w-full">
                        <FormLabel>Find non profit</FormLabel>
                        <FormControl>
                          <Input
                            aria-invalid={!!form.formState.errors.name}
                            placeholder="Type organization name here."
                            {...form.register('name')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                    <div className="w-full">
                      <FormField
                        name="category"
                        render={({ field }) => (
                          <FormItem
                            {...form.register('category')}
                            className="w-full"
                          >
                            <FormLabel>Cause of area</FormLabel>
                            <Select
                              onValueChange={value => {
                                field.onChange(value);
                              }}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  disabled={
                                    !isCategoryFetching && categories
                                      ? false
                                      : true
                                  }
                                >
                                  {!isCategoryFetching && categories ? (
                                    <SelectValue placeholder="Select Category" />
                                  ) : (
                                    <Loader2 className="animate-spin" />
                                  )}
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[50vh]">
                                {!isCategoryFetching && categories ? (
                                  categories.map(category => {
                                    console.log(isCategoryFetching);
                                    return (
                                      <SelectItem
                                        value={category.id}
                                        key={category.id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    );
                                  })
                                ) : (
                                  <span>Loading</span>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={value => {
                                field.onChange(value);
                                // handleSelectCountry(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[50vh]">
                                {Object.keys(countries).map(
                                  (country, index) => (
                                    <SelectItem value={country} key={index}>
                                      {country}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button className="">
                      <Search />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="-translate-y-10">
          <FundraisingList
            fundraisings={fundraisings?.items as unknown as FundWithOwner[]}
            isLoading={isFundLoading}
          />
          {/* <EventSlider
            events={events as EventType[]}
            isEventLoading={isEventLoading}
          />
          <FundSlider
            fundraisings={fundraisings as FundraisingType[]}
            isFundLoading={isFundLoading}
          /> */}
        </div>
      </Shell>
    </VolunteerLayout>
  );
};

export default Donate;
