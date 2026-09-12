"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlueprintTabSwitcherProps {
  activeTab: "grammar" | "reading" | "listening" | "writing" | "speaking";
  className?: string;
}

export function BlueprintTabSwitcher({
  activeTab,
  className,
}: BlueprintTabSwitcherProps) {
  const tabs = [
    {
      id: "grammar",
      label: "Ngữ Pháp Cốt Lõi",
      href: "/theory",
      icon: <GraduationCap className="h-4 w-4" />,
      badge: "GĐ 1",
    },
    {
      id: "reading",
      label: "14 Dạng Reading",
      href: "/theory/reading-methods",
      icon: <BookOpen className="h-4 w-4" />,
      badge: "GĐ 2",
    },
    {
      id: "listening",
      label: "4 Section Listening",
      href: "/theory/listening-methods",
      icon: <Headphones className="h-4 w-4" />,
      badge: "GĐ 2",
    },
    {
      id: "writing",
      label: "Chiến Lược Writing",
      href: "/theory/writing-blueprints",
      icon: <PenTool className="h-4 w-4" />,
      badge: "Task 1 & 2",
    },
    {
      id: "speaking",
      label: "Chiến Lược Speaking",
      href: "/theory/speaking-blueprints",
      icon: <Mic className="h-4 w-4" />,
      badge: "3 Parts",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border select-none",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
              isActive
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-lg",
                isActive ? "bg-indigo-600 text-white" : "bg-secondary text-muted-foreground"
              )}
            >
              {tab.icon}
            </div>
            <span>{tab.label}</span>
            <span
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded-full font-bold",
                isActive
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {tab.badge}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
