import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/misc";
import React from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center text-sm rounded-[16px] font-extralight transition-all shadow-button outline-none focus-visible:ring-4 focus-within:ring-4 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:shadow-button active:bg-button-default active:text-button-default-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-button-default text hover:text-button-active-foreground hover:bg-button-active hover:shadow-button-active",
        destructive:
          "bg-button-destructive text-destructive-foreground hover:shadow-button-active hover:bg-destructive-active hover:text-destructive-active-foreground",
      },
      size: {
        default: "w-fit h-fit px-4 py-2",
        wide: "px-24 py-5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        pill: "px-12 py-3 leading-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
