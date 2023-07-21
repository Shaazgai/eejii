'use client';

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table/table';
import { DataTablePagination } from './table/table-pagination';
import { TableSearchFilter } from './table/table-search-filter';

interface SearchFields {
  name: string;
  code: string;
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchFields: SearchFields[];
}

// eslint-disable-next-line import/prefer-default-export
export const IndexTable = <TData, TValue>({
  data,
  columns,
  searchFields,
}: TableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <div className="flex flex-col gap-5">
      <TableSearchFilter table={table} searchFields={searchFields} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow
                className="border-b border-gray-600/80"
                key={headerGroup.id}
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    // className="w-[100px] py-1 text-gray-100"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="w-full">
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow className="p my-10 border-b" key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="font-medium">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
