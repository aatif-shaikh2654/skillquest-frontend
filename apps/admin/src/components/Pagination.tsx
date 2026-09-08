import { Button } from "@repo/ui/components/button";
import { usePaginationParams } from "@/hooks/usePaginationParams";

type PaginationProps = {
  totalCount: number;
  totalPages: number;
  isLoading?: boolean;
  defaultLimit?: number;
};

export function Pagination({
  totalCount,
  totalPages,
  isLoading = false,
  defaultLimit = 20,
}: PaginationProps) {
  const { limit, page, setPage } = usePaginationParams(defaultLimit);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, totalCount);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 px-5 py-3">
      <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {isLoading ? "Loading" : `${rangeStart}–${rangeEnd} of ${totalCount}`}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canPrev || isLoading}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canNext || isLoading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
