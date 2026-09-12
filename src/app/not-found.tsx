import React from "react";
import Link from "next/link";
import { SearchX, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg text-center space-y-5">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 mb-1">
          <SearchX className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            404 • Không Tìm Thấy Trang
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Đường dẫn bạn yêu cầu không tồn tại hoặc đã được chuyển sang địa chỉ mới.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Mở Sổ Tay</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
