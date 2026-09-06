import { useSearchParams } from "react-router";

const DEFAULT_LIMIT = 20;

function readInt(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampLimit(limit: number) {
  return Math.min(100, Math.max(1, limit));
}

export function usePaginationParams(defaultLimit = DEFAULT_LIMIT) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = clampLimit(readInt(searchParams.get("limit"), defaultLimit));
  const page = Math.max(1, readInt(searchParams.get("page"), 1));

  function setPage(next: number) {
    const clamped = Math.max(1, next);
    if (clamped === page) return;

    const params = new URLSearchParams(searchParams);
    if (clamped <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(clamped));
    }
    if (limit === defaultLimit) {
      params.delete("limit");
    } else {
      params.set("limit", String(limit));
    }
    setSearchParams(params, { replace: true });
  }

  return { limit, page, setPage };
}
