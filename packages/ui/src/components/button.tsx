"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";
import { QuestLoader } from "@repo/ui/components/quest-loader";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-x-px active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary-hover before:absolute before:top-0 before:left-0 before:size-1.5 before:bg-foreground after:absolute after:right-0 after:bottom-0 after:size-1.5 after:bg-foreground",
        outline:
          "border-2 border-brand bg-transparent text-brand hover:bg-accent before:absolute before:top-0 before:left-0 before:size-1.5 before:bg-brand after:absolute after:right-0 after:bottom-0 after:size-1.5 after:bg-brand",
        secondary:
          "border-2 border-foreground bg-secondary text-secondary-foreground hover:bg-secondary-hover before:absolute before:top-0 before:left-0 before:size-1.5 before:bg-foreground after:absolute after:right-0 after:bottom-0 after:size-1.5 after:bg-foreground",
        ghost: "text-brand hover:bg-accent aria-expanded:bg-accent",
        destructive:
          "border-2 border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 tracking-wide has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs before:hidden after:hidden has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] before:hidden after:hidden has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-3 tracking-wide has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8 before:hidden after:hidden",
        "icon-xs": "size-6 before:hidden after:hidden [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 before:hidden after:hidden",
        "icon-lg": "size-9 before:hidden after:hidden",
        form: "h-12 w-full gap-2 px-5 text-[13px] font-semibold tracking-[0.16em] uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <QuestLoader size="sm" /> : children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
