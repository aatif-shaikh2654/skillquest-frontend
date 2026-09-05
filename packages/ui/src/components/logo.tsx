import { cn } from "@repo/ui/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8 shrink-0", className)}
    >
      <path
        fill="currentColor"
        d="M16 16 L26.517 8.359 A13 13 0 1 0 26.517 23.641 Z"
      />
    </svg>
  );
}
