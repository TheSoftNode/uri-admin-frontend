"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // Column-level presentation hints shared by every table in the console.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align?: "left" | "right";
    className?: string;
  }
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  /** Enables the quick filter input; matches across all string columns. */
  searchPlaceholder?: string;
  /** Rows per page; omit to render every row. */
  pageSize?: number;
  /** Total records on the server, shown in the footer when larger than `data`. */
  totalCount?: number;
  toolbar?: ReactNode;
  emptyMessage?: string;
}

export function DataTable<TData>({
  columns,
  data,
  searchPlaceholder,
  pageSize,
  totalCount,
  toolbar,
  emptyMessage = "Nothing to show yet.",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table manages its own memoisation.
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pageSize
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize } },
        }
      : {}),
  });

  const rows = table.getRowModel().rows;
  const showToolbar = Boolean(searchPlaceholder || toolbar);

  return (
    <div className="flex flex-col gap-3">
      {showToolbar ? (
        <div className="flex flex-wrap items-center justify-between gap-3 px-3">
          {searchPlaceholder ? (
            <label className="flex h-9 w-full max-w-xs items-center gap-2 rounded-xl bg-secondary px-3 focus-within:ring-[3px] focus-within:ring-ring/15">
              <Search className="size-3.5 text-subtle-foreground" />
              <input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-subtle-foreground"
              />
            </label>
          ) : (
            <span />
          )}
          {toolbar}
        </div>
      ) : null}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:[&>th]:bg-muted">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={cn(meta?.align === "right" && "text-right", meta?.className)}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          "inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground",
                          meta?.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" ? (
                          <ArrowUp className="size-3" />
                        ) : sorted === "desc" ? (
                          <ArrowDown className="size-3" />
                        ) : (
                          <ChevronsUpDown className="size-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta;
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(meta?.align === "right" && "text-right", meta?.className)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-28 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pageSize ? (
        <div className="flex items-center justify-between gap-3 px-3 pt-1">
          <p className="text-xs text-subtle-foreground">
            Showing {formatNumber(rows.length)} of{" "}
            <span className="font-mono tabular">{formatNumber(totalCount ?? data.length)}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() && !(totalCount && totalCount > data.length)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
