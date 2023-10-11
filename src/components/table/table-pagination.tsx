import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '../ui/button';

import type { Dispatch, SetStateAction } from 'react';

interface DataTablePaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
}

export function DataTablePagination({
  page,
  setPage,
  totalPage,
  hasNextPage,
  hasPrevPage,
  count,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm">Total: {count}</div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* <div className="flex items-center space-x-2"> */}
        {/*   <p className="text-sm font-medium">Rows per page</p> */}
        {/*   <Select */}
        {/*     value={`${table.getState().pagination.pageSize}`} */}
        {/*     onValueChange={value => { */}
        {/*       table.setPageSize(Number(value)); */}
        {/*     }} */}
        {/*   > */}
        {/*     <SelectTrigger className="h-8 w-[70px]"> */}
        {/*       <SelectValue placeholder={table.getState().pagination.pageSize} /> */}
        {/*     </SelectTrigger> */}
        {/*     <SelectContent side="top"> */}
        {/*       {[10, 20, 30, 40, 50].map(pageSize => ( */}
        {/*         <SelectItem key={pageSize} value={`${pageSize}`}> */}
        {/*           {pageSize} */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectContent> */}
        {/*   </Select> */}
        {/* </div> */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(1)}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage(page - 1)}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPage(page + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(totalPage - 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
