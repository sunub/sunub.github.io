import { Slot } from "@radix-ui/react-slot";
import React from "react";
import styled, { css } from "styled-components";

const baseButtonStyles = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  border-radius: 16px;
  font-weight: 500;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: none;

  &:focus-visible,
  &:focus-within {
    ring-width: 4px;
    box-shadow: 0 0 0 4px var(--ring-color, rgba(59, 130, 246, 0.5));
    ring-offset-width: 2px;
  }

  &:active {
    box-shadow: var(--shadow-button, 0 1px 3px rgba(0, 0, 0, 0.1));
    background-color: var(--button-default-bg, #e5e7eb);
    color: var(--button-default-foreground, #111827);
  }

  &:disabled {
    cursor: not-allowed !important;
    background-color: oklch(52.86% 0.2261 28.59) !important;
    color: oklch(97.35% 0 28.59) !important;
    opacity: 0.65 !important;

    &:hover {
      cursor: not-allowed !important;
    }
  }
`;

const variantStyles = {
  default: css`
    background-color: var(--button-default-bg, #e5e7eb);
    color: var(--text-color, #111827);

    &:hover {
      color: var(--button-active-foreground, #ffffff);
      background-color: var(--button-active-bg, #3b82a6);
      box-shadow: var(
        --shadow-button-active,
        0 4px 6px rgba(59, 130, 246, 0.25)
      );
    }
  `,
  destructive: css`
    background-color: var(--button-destructive-bg, #ef4444);
    color: var(--destructive-foreground, #ffffff);

    &:hover {
      box-shadow: var(
        --shadow-button-active,
        0 4px 6px rgba(239, 68, 68, 0.25)
      );
      background-color: var(--destructive-active-bg, #b91c1c);
      color: var(--destructive-active-foreground, #ffffff);
    }
  `,
};

const sizeStyles = {
  default: css`
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1rem;
  `,
  wide: css`
    padding: 1.25rem 6rem;
  `,
  sm: css`
    height: 2.25rem;
    border-radius: 0.375rem;
    padding: 0 0.75rem;
  `,
  lg: css`
    height: 2.75rem;
    border-radius: 0.375rem;
    padding: 0 2rem;
  `,
  pill: css`
    padding: 0.75rem 3rem;
    line-height: 0.75rem;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
  `,
};

interface StyledButtonProps {
  $variant?: keyof typeof variantStyles;
  $size?: keyof typeof sizeStyles;
  $customStyles?: any;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${baseButtonStyles}
  ${(props) => variantStyles[props.$variant || "default"]}
  ${(props) => sizeStyles[props.$size || "default"]}
  ${(props) => props.$customStyles}
`;

// Button component with forwarded ref
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
  customStyles?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      style,
      ...props
    },
    ref
  ) => {
    const customStyles = className
      ? css`
          ${className}
        `
      : "";

    const Comp = asChild ? Slot : StyledButton;

    const commonProps = {
      ref,
      style,
      ...props,
    };

    if (asChild) {
      return <Comp {...commonProps} className={className} />;
    }

    return (
      <Comp
        type="button"
        $variant={variant}
        $size={size}
        $customStyles={customStyles}
        {...commonProps}
      />
    );
  }
);

Button.displayName = "Button";

export const buttonVariants = {
  variant: Object.keys(variantStyles),
  size: Object.keys(sizeStyles),
};

export { Button };
