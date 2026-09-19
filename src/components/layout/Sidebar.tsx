"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Zap,
  PenTool,
  Brain,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Flame,
  Layers,
  Award,
  Home,
  Target,
  Bot,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/lib/constants";

const iconMap = {
  BookOpen,
  Zap,
  PenTool,
  Brain,
  ShieldAlert,
  Bot,
  Sparkles,
};

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLowEnergy, setIsLowEnergy] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      setIsLowEnergy(localStorage.getItem("ielts_low_energy_date") === today);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 z-50 flex md:hidden h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-border bg-card/95 backdrop-blur-md pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/" prefetch={true} className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-800 via-red-600 to-rose-600 text-white shadow-md shadow-red-700/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-foreground">
                    IELTS Mastery
                  </span>
                  <span className="inline-flex items-center rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                    7.5
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium truncate">
                  Lộ trình 180 Ngày Tự Động
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            title={collapsed ? "Mở rộng thanh điều hướng" : "Thu gọn"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top Quick Links: Home, Roadmap, Mock Test */}
        <div className="px-3 pt-3 space-y-1">
          <Link
            href="/"
            prefetch={true}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all group",
              pathname === "/"
                ? "bg-red-700 text-white shadow-sm shadow-red-700/30"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            title="Trang tổng quan"
          >
            <Home className={cn("h-4 w-4 shrink-0", pathname === "/" ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
            {!collapsed && <span>Tổng Quan</span>}
          </Link>

          <Link
            href="/roadmap"
            prefetch={true}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all group",
              pathname === "/roadmap"
                ? "bg-red-700 text-white shadow-sm shadow-red-700/30"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            title="Lộ trình học 180 ngày"
          >
            <Target className={cn("h-4 w-4 shrink-0", pathname === "/roadmap" ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
            {!collapsed && <span>Lộ Trình Học</span>}
          </Link>

          <Link
            href="/mock-test"
            prefetch={true}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all group",
              pathname.startsWith("/mock-test")
                ? "bg-red-700 text-white shadow-sm shadow-red-700/30"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            title="Thi Thử IELTS"
          >
            <Award className={cn("h-4 w-4 shrink-0", pathname.startsWith("/mock-test") ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
            {!collapsed && <span>Thi Thử IELTS</span>}
          </Link>

          <Link
            href="/guide"
            prefetch={true}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all group",
              pathname === "/guide"
                ? "bg-red-700 text-white shadow-sm shadow-red-700/30"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            title="Sổ tay hướng dẫn sử dụng web"
          >
            <BookOpen className={cn("h-4 w-4 shrink-0", pathname === "/guide" ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
            {!collapsed && <span>Sổ Tay Hướng Dẫn</span>}
          </Link>
        </div>

        {/* Section Title */}
        {!collapsed && (
          <div className="px-5 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            Phòng Học & Luyện Tập
          </div>
        )}

        {/* Main Modules Navigation */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1.5 py-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = iconMap[item.iconName as keyof typeof iconMap];
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive
                    ? "bg-red-500/10 text-red-700 dark:text-red-400 font-semibold ring-1 ring-red-500/30 shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "justify-center px-0"
                )}
                title={`${item.title} - ${item.description}`}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
                    isActive
                      ? "bg-red-700 text-white shadow-sm shadow-red-700/30"
                      : "bg-secondary/80 text-foreground group-hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {!collapsed && (
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-bold text-foreground">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground truncate font-normal">
                      {item.shortTitle}
                    </span>
                  </div>
                )}

                {!collapsed && item.badge && (
                  <span className="hidden lg:inline-flex rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                )}

                {/* Left Active Marker Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-red-700 dark:bg-red-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User / Daily Goals Widget at bottom */}
        <div className="p-3 border-t border-border mt-auto bg-card/60">
          {!collapsed ? (
            <div className={cn(
              "rounded-xl border p-3 space-y-2 transition-all",
              isLowEnergy ? "border-amber-500/30 bg-amber-500/[0.06]" : "border-border/80 bg-secondary/30"
            )}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Flame className={cn("h-4 w-4", isLowEnergy ? "text-amber-500 fill-amber-500" : "text-muted-foreground")} /> Chuỗi: 0 ngày
                </span>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  isLowEnergy ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  {isLowEnergy ? "🛡️ Cứu Chuỗi" : "Ngày 1/180"}
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Mục tiêu hôm nay: <strong>{isLowEnergy ? "0/1 micro-task (10p)" : "0/4 nhiệm vụ"}</strong>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                <div
                  className={cn("h-full rounded-full", isLowEnergy ? "bg-amber-500" : "bg-red-600")}
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 py-1" title="Chuỗi 0 ngày (bắt đầu 19/9)">
              <Flame className={cn("h-5 w-5", isLowEnergy ? "text-amber-500 fill-amber-500" : "text-muted-foreground")} />
              <span className="text-[10px] font-bold">0d</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
