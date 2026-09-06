import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { cn } from "@repo/ui/lib/utils";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  loadingMessage?: string;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  isLoading = false,
  isError = false,
  errorMessage = "Could not load rows.",
  loadingMessage = "Loading…",
  emptyMessage = "No rows yet.",
}: DataTableProps<T>) {
  if (isError) {
    return <p className="px-5 py-8 text-sm text-destructive">{errorMessage}</p>;
  }

  if (isLoading) {
    return (
      <p className="px-5 py-8 text-sm text-muted-foreground">
        {loadingMessage}
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <p className="px-5 py-8 text-sm text-muted-foreground">{emptyMessage}</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className={cn(
                "px-5 text-[10px] tracking-[0.18em] uppercase",
                column.headerClassName,
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={rowKey(row)}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={cn("px-5", column.className)}
              >
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
