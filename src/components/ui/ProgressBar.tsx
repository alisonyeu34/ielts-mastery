import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  variant?: "primary" | "emerald" | "amber" | "rose" | "purple" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  label,
  variant = "primary",
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  const fillVariants = {
    primary: "bg-red-700 dark:bg-red-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    purple: "bg-purple-500",
    gradient: "bg-gradient-to-r from-red-700 via-rose-600 to-amber-500",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-muted-foreground">{label}</span>}
          {showLabel && (
            <span className="font-semibold text-foreground ml-auto">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-secondary/80 border border-border/40",
          heights[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            fillVariants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
