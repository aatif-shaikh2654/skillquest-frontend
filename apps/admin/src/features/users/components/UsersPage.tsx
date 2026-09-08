import { useState } from "react";
import type { User } from "@repo/types";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { DataTable, type DataTableColumn } from "@/components/DataTable";
import { Pagination } from "@/components/Pagination";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useUsers } from "../hooks/useUsers";
import { USERS_PAGE_SIZE } from "../services/users.service";

function StatusMark({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="text-[10px] font-medium tracking-[0.16em] uppercase">
      <span className={on ? "text-brand" : "text-muted-foreground"}>
        {on ? "On" : "Off"}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

const columns: DataTableColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    className: "font-medium",
    cell: (user) => user.full_name,
  },
  {
    id: "email",
    header: "Email",
    className: "text-muted-foreground",
    cell: (user) => user.email,
  },
  {
    id: "instructor",
    header: "Instructor",
    cell: (user) => <StatusMark on={user.is_instructor} label="Instructor" />,
  },
  {
    id: "active",
    header: "Active",
    cell: (user) => <StatusMark on={user.is_active} label="Active" />,
  },
  {
    id: "verified",
    header: "Verified",
    cell: (user) => <StatusMark on={user.email_verified} label="Verified" />,
  },
];

export function UsersPage() {
  const [search, setSearch] = useState("");
  const querySearch = useDebounce(search, 500).trim();
  const { limit, page, setPage } = usePaginationParams(USERS_PAGE_SIZE);
  const users = useUsers({
    page,
    limit,
    search: querySearch || undefined,
  });
  const items = users.data?.data.items ?? [];
  const totalCount = users.data?.data.total_count ?? 0;
  const totalPages = users.data?.data.total_pages ?? 0;

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-8">
      <div className="relative border border-foreground/10 bg-card">
        <HudCorners size="sm" tone="ink" />
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
              Directory
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight">
              User accounts
            </h2>
          </div>
          <SearchInput
            value={search}
            onValueChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search users"
            aria-label="Search users"
          />
        </div>

        <DataTable
          columns={columns}
          data={items}
          rowKey={(user) => user.id}
          isLoading={users.isLoading}
          isError={users.isError}
          errorMessage={users.error?.message || "Could not load users."}
          loadingMessage="Fetching user accounts…"
          emptyMessage={
            querySearch
              ? "No users match this search."
              : "No user accounts yet."
          }
        />

        <Pagination
          totalCount={totalCount}
          totalPages={totalPages}
          isLoading={users.isFetching}
          defaultLimit={USERS_PAGE_SIZE}
        />
      </div>
    </div>
  );
}
