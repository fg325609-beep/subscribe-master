import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  className,
  hover = false,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200",
        paddingStyles[padding],
        hover &&
          "hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-medium text-slate-500 uppercase tracking-wider", className)} {...props} />
  );
}

export function CardValue({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-3xl font-bold text-gray-900", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-1 text-xs text-slate-500", className)} {...props} />;
}

// Kept for backward compatibility
export const CardContent = CardValue;
