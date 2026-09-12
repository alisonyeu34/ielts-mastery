"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_CONFIG } from "@/components/error-bank/ErrorCategoryBreakdown";
import { cn } from "@/lib/utils";

interface ErrorListTableProps {
  errors: ErrorItem[];
  onViewDetail: (item: ErrorItem) => void;
  onToggleMastered: (errorId: string, mastered: boolean) => void;
  onDelete: (errorId: string) => void;
  className?: string;
}

export function ErrorListTable({
  errors,
  onViewDetail,
  onToggleMastered,
  onDelete,
  className,
}: ErrorListTableProps) {
  return (
    <div className={cn("space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            Danh Sách Lỗi Sai Chi Tiết ({errors.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bấm vào bất kỳ dòng nào hoặc nút "Mổ xẻ" để xem giải thích bẫy khảo thí và kỹ thuật xử lý.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] font-bold tracking-wider border-b border-border/80">
            <tr>
              <th className="py-3 px-4">Ngữ Cảnh & Câu Hỏi</th>
              <th className="py-3 px-4">Câu Bạn Làm Sai</th>
              <th className="py-3 px-4">Đáp Án Chuẩn Band 7.5+</th>
              <th className="py-3 px-4">Phân Loại & Nguồn</th>
              <th className="py-3 px-4">Làm Lại</th>
              <th className="py-3 px-4">Trạng Thái</th>
              <th className="py-3 px-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {errors.length > 0 ? (
              errors.map((item) => {
                const config = ERROR_CATEGORY_CONFIG[item.errorType] || ERROR_CATEGORY_CONFIG.grammar;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-secondary/30 transition-colors cursor-pointer group"
                    onClick={() => onViewDetail(item)}
                  >
                    {/* Context */}
                    <td className="py-3.5 px-4 max-w-[200px] sm:max-w-xs font-medium text-foreground">
                      <div className="line-clamp-2 leading-relaxed">{item.questionContext}</div>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        Ngày tạo: {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>

                    {/* Wrong answer */}
                    <td className="py-3.5 px-4 max-w-[160px] text-rose-600 dark:text-rose-400 font-medium line-through">
                      <div className="line-clamp-2 leading-relaxed">"{item.userWrongAnswer}"</div>
                    </td>

                    {/* Correct answer */}
                    <td className="py-3.5 px-4 max-w-[180px] font-bold text-emerald-600 dark:text-emerald-400">
                      <div className="line-clamp-2 leading-relaxed">"{item.correctAnswer}"</div>
                    </td>

                    {/* Category & Source badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                            config.color,
                            config.bg,
                            config.border
                          )}
                        >
                          {config.label.split("(")[0].trim()}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold bg-secondary px-1.5 py-0.5 rounded">
                          {item.sourceModule}
                        </span>
                      </div>
                    </td>

                    {/* Retry count */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-muted-foreground font-semibold">
                      {item.retryCount} lần
                    </td>

                    {/* Mastered status toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onToggleMastered(item.id, !item.mastered)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 transition-all cursor-pointer",
                          item.mastered
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                        )}
                        title={item.mastered ? "Đổi sang chưa sửa" : "Đánh dấu là đã khắc phục"}
                      >
                        {item.mastered ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Đã khắc phục
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3" /> Chưa sửa
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewDetail(item)}
                          className="px-2.5 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Mổ xẻ nguyên nhân"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Mổ xẻ</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Bạn có chắc chắn muốn xóa lỗi này?")) {
                              onDelete(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors"
                          title="Xóa lỗi"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-muted-foreground">
                  Không có lỗi sai nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
