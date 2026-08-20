"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-1 text-white hover:bg-brand-1-dark active:bg-brand-1-dark",
  secondary:
    "bg-brand-2 text-white hover:bg-brand-2-dark active:bg-brand-2-dark",
  outline:
    "border-2 border-brand-1 text-brand-1 hover:bg-brand-1 hover:text-white",
  ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className="inline-block"
      >
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-1/50 disabled:pointer-events-none disabled:opacity-50",
            variantStyles[variant],
            sizeStyles[size],
            className,
          )}
          disabled={disabled || loading}
          {...props}
        >
          {loading && (
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {children}
        </button>
      </motion.div>
    );
  },
);

Button.displayName = "Button";
