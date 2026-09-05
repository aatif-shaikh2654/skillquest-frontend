"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";
import { Input, inputVariants } from "@repo/ui/components/input";

function PasswordInput({
  className,
  size = "default",
  ...props
}: Omit<ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof inputVariants>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={visible ? "text" : "password"}
        size={size}
        className={cn("pr-12", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        className="text-muted-foreground hover:bg-primary hover:text-foreground absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center border border-foreground/15 bg-background outline-none focus-visible:border-primary focus-visible:ring-0"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff className="size-4" strokeWidth={1.75} />
        ) : (
          <Eye className="size-4" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
