"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Headphones,
  GraduationCap,
  PenTool,
  Mic,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";

interface MethodologyTabSwitcherProps {
  activeTab: "grammar" | "reading" | "listening" | "writing" | "speaking" | "saved_notes";
  className?: string;
}

export function MethodologyTabSwitcher({
  activeTab,
  className,
}: MethodologyTabSwitcherProps) {
  const { count } = useTheoryBookmarks();

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
    {
      id: "saved_notes",
      label: "Sổ Cần Nhớ (Đã Lưu)",
      href: "/theory/saved-notes",
      icon: <BookmarkCheck className="h-4 w-4 text-amber-500" />,
      badge: count > 0 ? `${count} mục` : "Cá Nhân",
      highlight: true,
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
            prefetch={true}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              isActive
                ? tab.id === "saved_notes"
                  ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                  : "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span
              className={cn(
                "text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase",
                isActive
                  ? tab.id === "saved_notes"
                    ? "bg-slate-950/20 text-slate-950"
                    : "bg-secondary text-foreground"
                  : tab.id === "saved_notes"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-secondary/80 text-muted-foreground"
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
