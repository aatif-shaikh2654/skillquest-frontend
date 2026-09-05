import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

type SplitActionProps = {
  href: string;
  label: string;
  tone: "ink" | "mint";
  size?: "nav" | "hero";
};

export function SplitAction({
  href,
  label,
  tone,
  size = "nav",
}: SplitActionProps) {
  const isMint = tone === "mint";
  const isHero = size === "hero";

  return (
    <div
      className={cn(
        "group/cta flex max-w-full items-stretch",
        isHero &&
          "transition-transform duration-200 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 motion-reduce:transform-none",
      )}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-none font-medium tracking-tight whitespace-nowrap transition-colors duration-200",
          isHero
            ? "h-12 border-2 px-5 text-sm sm:h-14 sm:px-8 sm:text-base"
            : "h-10 border-2 px-4 text-sm group-hover/cta:-translate-y-0.5 sm:h-11 sm:px-6",
          isMint
            ? "border-foreground bg-primary text-foreground group-hover/cta:bg-primary-hover"
            : "border-white/95 bg-foreground text-white/95 group-hover/cta:bg-foreground/90",
          !isHero && isMint && "border-transparent",
        )}
      >
        {label}
      </Link>
      <Link
        href={href}
        aria-label={label}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-none transition-colors duration-200",
          isHero
            ? "size-12 border-2 border-l-0 sm:size-14"
            : "size-10 border-2 border-l-0 group-hover/cta:-translate-y-0.5 sm:size-11",
          isMint
            ? "border-foreground bg-primary text-foreground group-hover/cta:bg-primary-hover"
            : "border-white/95 bg-foreground text-white/95 group-hover/cta:bg-foreground/90",
          !isHero && isMint && "border-transparent",
        )}
      >
        <ArrowUpRight
          className={cn(
            "transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5",
            isHero ? "size-4 sm:size-5" : "size-4",
          )}
          strokeWidth={2.25}
        />
      </Link>
    </div>
  );
}
