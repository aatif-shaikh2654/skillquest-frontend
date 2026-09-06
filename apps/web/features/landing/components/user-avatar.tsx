import { cn } from "@repo/ui/lib/utils";

export function playerInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];

  if (!first) return "?";
  if (!last || parts.length === 1) return first.slice(0, 2).toUpperCase();

  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function playerFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

type UserAvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-8 text-[11px]",
  md: "size-10 text-xs",
  lg: "size-16 text-lg",
};

export function UserAvatar({ name, size = "md", className }: UserAvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-none bg-foreground font-semibold tracking-tight text-white",
        sizes[size],
        className,
      )}
    >
      {playerInitials(name)}
    </span>
  );
}
