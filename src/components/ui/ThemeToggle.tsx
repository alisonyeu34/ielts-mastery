"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-lg border border-border/60 bg-card/60 animate-pulse",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium transition-colors",
        "border border-border/80 bg-card hover:bg-accent hover:text-accent-foreground text-foreground shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        className
      )}
      title={isDark ? "Chuyển sang Giao diện Sáng" : "Chuyển sang Giao diện Tối (Đêm)"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600 transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="ml-2 text-xs font-medium">
          {isDark ? "Giao diện Tối" : "Giao diện Sáng"}
        </span>
      )}
    </button>
  );
}
