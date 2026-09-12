'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  BellRing,
  Brain,
  ShieldAlert,
  Flame,
  Award,
  Shield,
  Check,
  CheckCheck,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBrowserPushReminder } from '@/hooks/useBrowserPushReminder';

interface NotificationItem {
  id: string;
  type: 'vocab' | 'error' | 'streak' | 'readiness' | 'exam_day';
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  href: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

interface NotificationDropdownProps {
  dueVocabCount?: number;
  unresolvedErrorsCount?: number;
  streakDays?: number;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  dueVocabCount = 0,
  unresolvedErrorsCount = 0,
  streakDays = 0
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Desktop push reminder hook
  const {
    supported: pushSupported,
    permission: pushPermission,
    settings: pushSettings,
    isTestSending,
    enablePushNotifications,
    disablePushNotifications,
    updateReminderTime,
    sendTestNotification,
  } = useBrowserPushReminder(dueVocabCount, unresolvedErrorsCount);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'readiness',
      title: 'Chào mừng bạn đến với lộ trình 180 Ngày!',
      message: 'Hệ thống đã chuẩn bị sẵn sàng cho ngày học đầu tiên (12/9/2026). Mục tiêu: Bứt phá lên Band 7.5.',
      timeAgo: 'Hôm nay',
      unread: true,
      href: '/roadmap',
      icon: Sparkles,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10'
    },
    {
      id: 'notif-2',
      type: 'vocab',
      title: 'Sổ Từ Vựng FSRS',
      message: dueVocabCount > 0
        ? `Hôm nay bạn có ${dueVocabCount} từ vựng cần ôn tập ngắt quãng.`
        : 'Sẵn sàng nạp từ vựng mới khi bạn học bài học đầu tiên.',
      timeAgo: 'Hôm nay',
      unread: dueVocabCount > 0,
      href: '/vocab',
      icon: Brain,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10'
    },
    {
      id: 'notif-3',
      type: 'error',
      title: 'Sổ Tay Lỗi Sai (Error Bank)',
      message: unresolvedErrorsCount > 0
        ? `Có ${unresolvedErrorsCount} lỗi sai cần luyện tập lại để khắc phục.`
        : 'Hiện tại chưa có lỗi sai nào. Hệ thống sẽ ghi nhận khi bạn làm bài luyện tập.',
      timeAgo: 'Hôm nay',
      unread: unresolvedErrorsCount > 0,
      href: '/error-bank/drill',
      icon: ShieldAlert,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    {
      id: 'notif-4',
      type: 'streak',
      title: 'Chuỗi Học Tập',
      message: streakDays > 0
        ? `Bạn đang duy trì chuỗi ${streakDays} ngày liên tiếp!`
        : 'Bắt đầu học ngày mai (12/9/2026) để khởi động chuỗi ngày học đầu tiên nhé!',
      timeAgo: 'Hôm nay',
      unread: false,
      href: '/theory',
      icon: Flame,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    }
  ]);

  // Sync notifications when counts update
  useEffect(() => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === 'notif-2') {
          return {
            ...item,
            message: dueVocabCount > 0
              ? `Hôm nay bạn có ${dueVocabCount} từ vựng cần ôn tập ngắt quãng.`
              : 'Sẵn sàng nạp từ vựng mới khi bạn học bài học đầu tiên.',
            unread: dueVocabCount > 0,
          };
        }
        if (item.id === 'notif-3') {
          return {
            ...item,
            message: unresolvedErrorsCount > 0
              ? `Có ${unresolvedErrorsCount} lỗi sai cần luyện tập lại để khắc phục.`
              : 'Hiện tại chưa có lỗi sai nào. Hệ thống sẽ ghi nhận khi bạn làm bài luyện tập.',
            unread: unresolvedErrorsCount > 0,
          };
        }
        return item;
      })
    );
  }, [dueVocabCount, unresolvedErrorsCount]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const removeNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Thông báo nhắc nhở học tập"
        aria-expanded={isOpen}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground border transition-all cursor-pointer",
          isOpen
            ? "border-indigo-500/50 bg-accent text-foreground shadow-sm shadow-indigo-500/10"
            : "border-border/80 bg-card"
        )}
        title="Thông báo nhắc nhở học tập"
      >
        <Bell className="h-4 w-4" />

        {/* Pulse Dot & Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/80 bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Trung Tâm Thông Báo</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {unreadCount} mới
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Đã đọc tất cả
              </button>
            )}
          </div>

          {/* Desktop Push Notification Banner / Settings Card */}
          {pushSupported && (
            <div className="p-3.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-b border-border/80 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold shrink-0 mt-0.5">
                    <BellRing className="h-4 w-4 animate-bounce" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-black text-foreground">
                        Thông Báo Đẩy Màn Hình
                      </span>
                      {pushPermission === "granted" && pushSettings.enabled ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          ● Đang Bật
                        </span>
                      ) : pushPermission === "denied" ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300">
                          ● Bị Chặn
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                          ● Chưa Bật
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                      Nhắc nhở ôn từ vựng FSRS & sửa lỗi sai đúng giờ trên màn hình máy tính
                    </p>
                  </div>
                </div>

                {/* Main Action Button */}
                {pushPermission === "granted" ? (
                  <button
                    type="button"
                    onClick={() =>
                      pushSettings.enabled ? disablePushNotifications() : enablePushNotifications()
                    }
                    className={cn(
                      "px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border shadow-2xs",
                      pushSettings.enabled
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 border-emerald-500/30"
                        : "bg-secondary text-muted-foreground hover:text-foreground border-border"
                    )}
                  >
                    {pushSettings.enabled ? "Tắt" : "Bật"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={enablePushNotifications}
                    className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shrink-0 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    Bật ngay
                  </button>
                )}
              </div>

              {/* Sub-controls if permission granted & enabled */}
              {pushPermission === "granted" && pushSettings.enabled && (
                <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-border/50 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>Giờ nhắc:</span>
                    <select
                      value={pushSettings.reminderTime}
                      onChange={(e) => updateReminderTime(e.target.value)}
                      className="bg-card border border-border rounded-lg px-2 py-0.5 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                      {[
                        "07:00",
                        "08:00",
                        "09:00",
                        "12:00",
                        "14:00",
                        "18:00",
                        "19:00",
                        "20:00",
                        "21:00",
                        "22:00"
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t} ({t.startsWith("2") || t.startsWith("19") || t.startsWith("18") ? "Tối" : "Sáng/Chiều"})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={sendTestNotification}
                    disabled={isTestSending}
                    className="px-2.5 py-1 rounded-lg bg-secondary/90 hover:bg-secondary text-foreground text-[11px] font-bold border border-border flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0"
                    title="Bắn ngay một thông báo thử nghiệm ra góc màn hình Desktop"
                  >
                    <Send className="h-3 w-3 text-indigo-500" />
                    <span>{isTestSending ? "Đang bắn..." : "Gửi thử"}</span>
                  </button>
                </div>
              )}

              {/* Denied Warning helper */}
              {pushPermission === "denied" && (
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-700 dark:text-rose-300 font-medium leading-relaxed">
                  ⚠️ Trình duyệt đang chặn thông báo. Vui lòng bấm vào <strong>biểu tượng ổ khóa</strong> bên trái thanh địa chỉ URL $	o$ Đổi Thông báo sang <strong>"Cho phép" (Allow)</strong> rồi tải lại trang.
                </div>
              )}
            </div>
          )}

          {/* Notification List */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-border/60">
            {notifications.length > 0 ? (
              notifications.map((item) => {
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      markAsRead(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group relative flex items-start gap-3.5 p-3.5 hover:bg-secondary/40 transition-colors cursor-pointer text-left block",
                      item.unread ? "bg-secondary/15" : ""
                    )}
                  >
                    {/* Unread indicator dot */}
                    {item.unread && (
                      <span className="absolute left-1.5 top-5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    )}

                    {/* Icon */}
                    <div
                      className={cn("p-2 rounded-xl shrink-0", item.iconBg, item.iconColor)}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={cn(
                            "text-xs leading-snug truncate",
                            item.unread
                              ? "text-foreground font-bold"
                              : "text-foreground/90 font-semibold"
                          )}
                        >
                          {item.title}
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => removeNotification(e, item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-opacity cursor-pointer"
                          title="Xóa thông báo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 pt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{item.timeAgo}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="py-10 px-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
                  <Check className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-xs font-medium text-foreground">
                  Không có thông báo mới nào
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Bạn đang duy trì tiến độ học tập rất tốt!
                </p>
              </div>
            )}
          </div>

          {/* Footer Quick Links */}
          <div className="p-2.5 bg-secondary/30 border-t border-border/80 flex items-center justify-between text-xs">
            <Link
              href="/roadmap"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <span>Xem Lộ Trình 180 Ngày</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/readiness-audit"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>Kiểm Định CRI</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
