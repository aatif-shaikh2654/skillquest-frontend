import { cn } from "@repo/ui/lib/utils";

const sizes = {
  sm: {
    head: "size-3",
    start: "pl-4",
    pellets: 3,
    pellet: "size-1",
    gap: "gap-1",
    travel: "1.5rem",
  },
  md: {
    head: "size-5",
    start: "pl-[1.625rem]",
    pellets: 4,
    pellet: "size-1.5",
    gap: "gap-1.5",
    travel: "3rem",
  },
  lg: {
    head: "size-9",
    start: "pl-11",
    pellets: 6,
    pellet: "size-2",
    gap: "gap-2",
    travel: "6rem",
  },
} as const;

const BITE_MS = 280;

type QuestLoaderProps = {
  className?: string;
  size?: keyof typeof sizes;
};

export function QuestLoader({ className, size = "md" }: QuestLoaderProps) {
  const spec = sizes[size];
  const cycleMs = (spec.pellets * 2 + 3) * BITE_MS;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center",
          spec.gap,
          spec.start,
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 left-0 animate-pacman-move",
            spec.head,
          )}
          style={{
            animationDuration: `${cycleMs}ms`,
            ["--pacman-travel" as string]: spec.travel,
          }}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 origin-bottom rounded-t-full bg-current animate-pacman-top" />
          <span className="absolute inset-x-0 bottom-0 h-1/2 origin-top rounded-b-full bg-current animate-pacman-bottom" />
        </span>
        {Array.from({ length: spec.pellets }, (_, index) => (
          <span
            key={index}
            className={cn(
              "animate-pacman-pellet shrink-0 rounded-full bg-current",
              spec.pellet,
            )}
            style={{
              animationDuration: `${cycleMs}ms`,
              animationDelay: `${index * BITE_MS}ms`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
