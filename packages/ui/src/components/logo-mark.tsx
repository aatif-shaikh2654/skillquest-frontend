import { cn } from "@repo/ui/lib/utils";
import { Logo } from "@repo/ui/components/logo";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center border border-primary bg-hero-deep",
        className,
      )}
    >
      <span className="absolute top-0 left-0 size-1.5 bg-primary" />
      <span className="absolute right-0 bottom-0 size-1.5 bg-primary" />
      <Logo className="size-[55%] text-primary" />
    </span>
  );
}
