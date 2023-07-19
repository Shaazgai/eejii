import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import type { ChangeEvent } from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';
import type { FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Calendar } from './calendar';
import { FormControl, FormLabel } from './form';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const DatePicker = ({ field }: { field: FieldValues }) => {
  function handleTimeChange(e: ChangeEvent<HTMLInputElement>, date: Date) {
    e.preventDefault();
    const selectedDate = new Date(date); // Convert the selected date to a Date object
    const { value } = e.target;
    const hours = Number.parseInt(value.split(':')[0] || '00', 10);
    const minutes = Number.parseInt(value.split(':')[1] || '00', 10);
    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);

    const modifiedDate = DateTime.fromFormat(
      selectedDate.toLocaleString(),
      'dd/MM/yyyy, HH:mm:ss'
    ).toJSDate();
    console.log(modifiedDate.getHours(), modifiedDate.getMinutes());
    return modifiedDate;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? (
              format(field.value, 'PPP, HH:mm')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange as SelectSingleEventHandler}
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
        <div className="p-3">
          <FormLabel>Time</FormLabel>
          <Input
            type="time"
            onChange={e => {
              field.onChange(handleTimeChange(e, field.value)); // Update the startTime field value with the selected date and time
            }}
            value={
              field.value
                ? `${field.value
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${field.value
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`
                : ''
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
