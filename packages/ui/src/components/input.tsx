import type { ComponentProps } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";
import { HudCorners } from "@repo/ui/components/hud-corners";

const inputVariants = cva(
  "w-full min-w-0 rounded-none border-2 border-foreground/15 bg-card py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
  {
    variants: {
      size: {
        default: "h-8 px-2.5",
        form: "h-12 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <div data-slot="input-frame" className="group/input relative w-full">
      <HudCorners
        size="sm"
        className="opacity-0 transition-opacity group-focus-within/input:opacity-100"
      />
      <InputPrimitive
        type={type}
        data-slot="input"
        data-size={size}
        className={cn(inputVariants({ size, className }))}
        {...props}
      />
    </div>
  );
}

export { Input, inputVariants };
