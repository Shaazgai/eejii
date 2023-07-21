import type { Table } from '@tanstack/react-table';

interface FiltersProps {
  name: string;
  code: string;
}

interface TableFilterProps<TData> {
  table: Table<TData>;
  searchFields: FiltersProps[];
}

export function TableSearchFilter<TData>({
  table,
  searchFields,
}: TableFilterProps<TData>) {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-md border  px-2 ">
      {searchFields.length > 1 &&
        searchFields.map((filter, index) => (
          <div className="py-4" key={index}>
            <div className="flex items-center rounded-md border  ">
              <label
                htmlFor={filter?.code}
                className="flex h-9 items-center justify-center p-2"
              >
                {filter.name}
              </label>
              <div id={filter?.code} className="0 flex gap-2">
                <input
                  type="text"
                  className="h-9 w-full px-2	focus:outline-none "
                  value={
                    (table
                      .getColumn(filter?.code)
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={event =>
                    table
                      .getColumn(filter?.code)
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
