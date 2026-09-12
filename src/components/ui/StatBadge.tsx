import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  variant?: "primary" | "amber" | "emerald" | "rose" | "violet" | "secondary";
  className?: string;
  size?: "sm" | "md";
}

export function StatBadge({
  icon: Icon,
  label,
  value,
  suffix,
  variant = "secondary",
  className,
  size = "md",
}: StatBadgeProps) {
  const variantStyles = {
    primary: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    violet: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    secondary: "bg-secondary text-secondary-foreground border-border",
  };

  const iconColors = {
    primary: "text-indigo-500",
    amber: "text-amber-500",
    emerald: "text-emerald-500",
    rose: "text-rose-500",
    violet: "text-purple-500",
    secondary: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 font-medium transition-all shadow-sm",
        variantStyles[variant],
        size === "sm" ? "text-xs py-1 px-2.5" : "text-sm",
        className
      )}
    >
      <Icon className={cn("shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4", iconColors[variant])} />
      <span className="text-muted-foreground text-xs font-normal">{label}:</span>
      <span className="font-bold tracking-tight text-foreground">
        {value}
        {suffix && <span className="ml-0.5 text-xs font-normal text-muted-foreground">{suffix}</span>}
      </span>
    </div>
  );
}
