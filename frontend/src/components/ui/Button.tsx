"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?   : "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, className, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center tracking-[3px] text-[10px] font-medium uppercase transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-racing-red text-white hover:bg-red-700 border border-racing-red",
      outline: "border border-racing-red text-racing-red hover:bg-racing-red hover:text-white",
      ghost  : "border border-white/10 text-white/60 hover:border-racing-red hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2",
      md: "px-6 py-3",
      lg: "px-10 py-4",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            SENDING...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
