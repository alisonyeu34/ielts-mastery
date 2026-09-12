"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Circle,
  BookOpen,
  Zap,
  Clock,
  Check,
} from "lucide-react";
import { RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { UserProgress } from "@/types/database";
import { cn } from "@/lib/utils";

interface DailyTaskDrawerProps {
  isOpen: boolean;
  dayNode: RoadmapDayNode | null;
  progress: UserProgress;
  onToggleTask?: (
    dayNumber: number,
    taskType: "theoryCompleted" | "drillCompleted" | "vocabReviewed" | "errorBankCleared"
  ) => void;
  onSyncTask?: (
    dayNumber: number,
    taskType: "theoryCompleted" | "drillCompleted" | "vocabReviewed" | "errorBankCleared",
    isDone: boolean
  ) => void;
  onClose: () => void;
}

export function DailyTaskDrawer({
  isOpen,
  dayNode,
  progress,
  onToggleTask,
  onClose,
}: DailyTaskDrawerProps) {
  if (!isOpen || !dayNode) return null;

  const dayStatus = progress.dailyChecklistStatus?.[dayNode.dayNumber] || {
    theoryCompleted: false,
    drillCompleted: false,
    vocabReviewed: false,
    errorBankCleared: false,
  };

  const tasksList = [
    {
      key: "theoryCompleted" as const,
      isDone: !!dayStatus.theoryCompleted,
      taskData: dayNode.tasks[0],
      defaultTag: "Lý thuyết trọng tâm",
    },
    {
      key: "drillCompleted" as const,
      isDone: !!dayStatus.drillCompleted,
      taskData: dayNode.tasks[1],
      defaultTag: "Thực hành phản xạ",
    },
    {
      key: "vocabReviewed" as const,
      isDone: !!dayStatus.vocabReviewed,
      taskData: dayNode.tasks[2],
      defaultTag: "Từ vựng & Cụm từ",
    },
    {
      key: "errorBankCleared" as const,
      isDone: !!dayStatus.errorBankCleared,
      taskData: dayNode.tasks[3],
      defaultTag: "Sổ tay & Ôn tập",
    },
  ];

  const completedTasksCount = tasksList.filter((t) => t.isDone).length;
  const dayProgressPercent = Math.round((completedTasksCount / 4) * 100);

  const handleToggle = (taskKey: "theoryCompleted" | "drillCompleted" | "vocabReviewed" | "errorBankCleared") => {
    if (onToggleTask && dayNode) {
      onToggleTask(dayNode.dayNumber, taskKey);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                Phase {dayNode.phase} • Tuần {dayNode.week}
              </span>
              <span className="font-mono text-xs font-bold text-muted-foreground">
                Ngày {dayNode.dayNumber}/165
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-foreground">
              {dayNode.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {dayNode.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            aria-label="Đóng bảng công việc"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Day Completion Progress Bar */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3">
          <div className="flex items-center justify-between text-xs flex-wrap gap-2">
            <div>
              <span className="font-bold text-foreground block">
                Tiến Độ Ngày {dayNode.dayNumber}: {completedTasksCount}/4 ca học hoàn thành
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                Bấm vào ô tròn hoặc nút &quot;Tích Xong&quot; để tự đánh dấu hoàn thành ca học
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary text-sm px-2.5 py-1 rounded-xl bg-background border border-border">
                {dayProgressPercent}%
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              style={{ width: `${dayProgressPercent}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-300",
                dayProgressPercent === 100 ? "bg-emerald-600" : "bg-primary"
              )}
            />
          </div>
        </div>

        {/* 4 Daily Tasks Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Danh Sách 4 Ca Học Ngày {dayNode.dayNumber}:
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              Click vào ca học để đánh dấu đã hoàn thành
            </span>
          </div>

          {tasksList.map((t) => {
            const isTaskComplete = t.isDone;

            return (
              <div
                key={t.key}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex flex-col gap-3 text-xs group",
                  isTaskComplete
                    ? "bg-emerald-500/[0.04] border-emerald-500/40"
                    : "bg-card border-border/80 hover:border-primary/40 hover:bg-secondary/15"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Interactive Toggle Target */}
                  <div
                    onClick={() => handleToggle(t.key)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggle(t.key);
                      }
                    }}
                    title={isTaskComplete ? "Bấm để bỏ đánh dấu hoàn thành" : "Bấm để đánh dấu đã hoàn thành ca học này"}
                  >
                    {/* Checkbox Icon */}
                    <div className="shrink-0 mt-0.5">
                      {isTaskComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 transition-transform group-hover:scale-110" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all" />
                      )}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            "font-bold leading-snug transition-colors",
                            isTaskComplete
                              ? "text-muted-foreground line-through decoration-muted-foreground/50"
                              : "text-foreground group-hover:text-primary"
                          )}
                        >
                          {t.taskData.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{t.taskData.durationMinutes} phút</span>
                        </span>
                        {t.taskData.skillBadge && (
                          <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-sans font-bold text-[10px]">
                            {t.taskData.skillBadge}
                          </span>
                        )}
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-[10px] text-muted-foreground font-sans">
                          {t.defaultTag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Học Kỹ Năng / Luyện Tập */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {t.taskData.theoryUrl ? (
                      <Link
                        href={t.taskData.theoryUrl}
                        prefetch={true}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                        title="Mở bài học lý thuyết"
                      >
                        <BookOpen className="h-3 w-3" />
                        <span>Học Kỹ Năng</span>
                      </Link>
                    ) : null}

                    {t.taskData.practiceUrl || t.taskData.linkUrl ? (
                      <Link
                        href={t.taskData.practiceUrl || t.taskData.linkUrl}
                        prefetch={true}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground border border-border text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Vào làm bài luyện tập"
                      >
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>Luyện Tập</span>
                      </Link>
                    ) : null}

                    {/* Quick Complete Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggle(t.key)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border",
                        isTaskComplete
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                          : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:bg-secondary/80"
                      )}
                      title={isTaskComplete ? "Hủy hoàn thành" : "Đánh dấu hoàn thành"}
                    >
                      {isTaskComplete ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Đã Xong</span>
                        </>
                      ) : (
                        <span>Tích Xong</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sub-status Indicator */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground/80 font-medium">
                    {t.defaultTag}
                  </span>
                  <div>
                    {isTaskComplete ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold font-sans text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Hoàn thành
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggle(t.key)}
                        className="text-primary hover:underline font-semibold font-sans text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        Bấm để tích hoàn thành
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-border/80 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {dayProgressPercent === 100
              ? "🎉 Tuyệt vời! Bạn đã hoàn thành cả 4 ca học của ngày hôm nay."
              : "Hoàn thành đủ 4 ca học để đạt 100% mục tiêu ngày và mở khóa lộ trình tiếp theo."}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
