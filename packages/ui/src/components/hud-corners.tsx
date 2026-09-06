import { cn } from "@repo/ui/lib/utils";

type HudCornersProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "mint" | "white" | "ink" | "danger" | "sky" | "brand";
};

const sizes = {
  sm: "h-2 w-2",
  md: "h-3.5 w-3.5",
  lg: "h-8 w-8",
};

const tones = {
  mint: "border-primary",
  white: "border-white/70",
  ink: "border-foreground",
  danger: "border-destructive",
  sky: "border-secondary",
  brand: "border-brand",
};

const corners = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "right-0 bottom-0 border-b-2 border-r-2",
] as const;

export function HudCorners({
  className,
  size = "md",
  tone = "mint",
}: HudCornersProps) {
  const corner = cn("absolute", sizes[size], tones[tone]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {corners.map((position) => (
        <span key={position} className={cn(corner, position)} />
      ))}
    </div>
  );
}
