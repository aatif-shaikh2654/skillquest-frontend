import type { ComponentProps } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";

type SearchInputProps = Omit<
  ComponentProps<typeof Input>,
  "size" | "onChange" | "value"
> & {
  value: string;
  onValueChange: (value: string) => void;
  size?: "default" | "form";
};

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search",
  className,
  size = "form",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        {...props}
        size={size}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn(
          "px-11 [&::-webkit-search-cancel-button]:hidden",
          className,
        )}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute top-1/2 right-3 z-10 grid size-6 -translate-y-1/2 place-items-center text-muted-foreground hover:text-foreground"
          onClick={() => onValueChange("")}
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
