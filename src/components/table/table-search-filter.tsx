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
    <div className="grid grid-cols-3 gap-4 rounded-md border border-gray-600/80 bg-gray-950/20 px-2 ">
      {searchFields.length > 1 &&
        searchFields.map((filter, index) => (
          <div className="flex items-center py-4" key={index}>
            <label
              htmlFor="email"
              className="flex h-9 items-center justify-center rounded-l-md bg-gray-600 p-2"
            >
              {filter.name}
            </label>
            <div id="email" className="flex gap-2 rounded-r-md bg-gray-600/50">
              <input
                type="text"
                className="h-9 w-full bg-transparent px-2	focus:outline-none "
                value={
                  (table.getColumn(filter?.code)?.getFilterValue() as string) ??
                  ''
                }
                onChange={event =>
                  table.getColumn('email')?.setFilterValue(event.target.value)
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
}
