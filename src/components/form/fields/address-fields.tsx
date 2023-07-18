import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'react-hook-form';
import countries from 'src/data/city.json';
import provinces from 'src/data/province.json';
import type { z } from 'zod';

import {
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
import type { addressFormSchema } from '@/lib/validation/address-validation-schema';

type AddressFormProps = {
  form: FormProps<z.infer<typeof addressFormSchema>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  selectedCity: string;
};
const AddressFields = ({
  form,
  setSelectedCity,
  setSelectedCountry,
  selectedCountry,
  selectedCity,
}: AddressFormProps) => {
  const [cities, setCities] = useState<string[]>();

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
  };
  const handleSelectCity = (value: string) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    const citiesArray = Object.entries(countries)
      .filter(args => args[0] === selectedCountry)
      .map(args => args[1]);
    setCities(citiesArray[0]);
  }, [selectedCountry]);
  const ubProvinces = provinces.filter(province => province.aimag_id === 22);
  return (
    <div className="w-[500px] space-y-2">
      <div className="flex gap-5">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={value => {
                  field.onChange(value);
                  handleSelectCountry(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[50vh]">
                  {Object.keys(countries).map((country, index) => (
                    <SelectItem value={country} key={index}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>City</FormLabel>
              <Select
                onValueChange={value => {
                  field.onChange(value);
                  handleSelectCity(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[50vh]">
                  {cities &&
                    cities.map((city, index) => (
                      <SelectItem value={city} key={index}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {selectedCity === 'Ulan Bator' ? (
        <FormField
          control={form.control}
          name="provinceName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Province</FormLabel>
              <Select
                onValueChange={value => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[50vh]">
                  {ubProvinces &&
                    ubProvinces.map((province, index) => {
                      return (
                        <SelectItem value={province.name} key={index}>
                          {province.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <>
          <FormField
            control={form.control}
            name="provinceName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Province name</FormLabel>
                <Input placeholder="Province Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Street</FormLabel>
            <Input placeholder="Street" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddressFields;
