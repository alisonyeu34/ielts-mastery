"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  sendDesktopNotification,
  getPushSettings,
  savePushSettings,
  checkScheduledReminder,
  registerPushServiceWorker,
  PushNotificationSettings,
} from "@/lib/browserNotification";

export function useBrowserPushReminder(dueVocabCount = 0, unresolvedErrorsCount = 0) {
  const [supported, setSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [settings, setSettings] = useState<PushNotificationSettings>({
    enabled: false,
    reminderTime: "20:00",
    lastNotifiedDate: "",
  });
  const [isTestSending, setIsTestSending] = useState<boolean>(false);

  // Initialize status on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSupp = isNotificationSupported();
    setSupported(isSupp);

    if (isSupp) {
      setPermission(getNotificationPermission());
      setSettings(getPushSettings());
      registerPushServiceWorker();
    }
  }, []);

  // Periodic check for scheduled daily reminder
  useEffect(() => {
    if (!supported || permission !== "granted" || !settings.enabled) {
      return;
    }

    // Check immediately on mount/update
    checkScheduledReminder(dueVocabCount, unresolvedErrorsCount);

    // Then check every 45 seconds
    const interval = setInterval(() => {
      checkScheduledReminder(dueVocabCount, unresolvedErrorsCount);
    }, 45 * 1000);

    return () => clearInterval(interval);
  }, [supported, permission, settings.enabled, settings.reminderTime, dueVocabCount, unresolvedErrorsCount]);

  // Enable push notifications
  const enablePushNotifications = useCallback(async () => {
    if (!isNotificationSupported()) {
      alert("Trình duyệt của bạn không hỗ trợ Web Notifications.");
      return false;
    }

    const perm = await requestNotificationPermission();
    setPermission(perm);

    if (perm === "granted") {
      const updated = savePushSettings({ enabled: true });
      setSettings(updated);

      // Send immediate welcome test notification
      await sendDesktopNotification({
        title: "🎉 [IELTS for ME] Đã Bật Thông Báo Màn Hình!",
        body: `Hệ thống sẽ nhắc bạn ôn từ vựng & khắc phục lỗi sai vào lúc ${updated.reminderTime} mỗi ngày.`,
        url: "/dashboard",
        tag: "welcome-push",
      });
      return true;
    } else if (perm === "denied") {
      alert("Thông báo đã bị chặn trên trình duyệt. Vui lòng bấm vào biểu tượng ổ khóa bên trái thanh địa chỉ URL để cho phép (Allow).");
      return false;
    }
    return false;
  }, []);

  // Disable push notifications
  const disablePushNotifications = useCallback(() => {
    const updated = savePushSettings({ enabled: false });
    setSettings(updated);
  }, []);

  // Update reminder time
  const updateReminderTime = useCallback((newTime: string) => {
    const updated = savePushSettings({ reminderTime: newTime });
    setSettings(updated);
  }, []);

  // Send test push notification
  const sendTestNotification = useCallback(async () => {
    if (permission !== "granted") {
      await enablePushNotifications();
      return;
    }

    setIsTestSending(true);
    try {
      await sendDesktopNotification({
        title: "🔔 [IELTS for ME] Kiểm Tra Thông Báo Đẩy",
        body: dueVocabCount > 0 || unresolvedErrorsCount > 0
          ? `Thử nghiệm thành công! Bạn hiện có ${dueVocabCount} từ vựng FSRS và ${unresolvedErrorsCount} lỗi sai cần luyện tập.`
          : "Thông báo màn hình đang hoạt động hoàn hảo! Bấm vào đây để mở ứng dụng luyện thi.",
        url: dueVocabCount > 0 ? "/vocab" : "/error-bank",
        tag: "test-notification",
      });
    } finally {
      setTimeout(() => setIsTestSending(false), 800);
    }
  }, [permission, dueVocabCount, unresolvedErrorsCount, enablePushNotifications]);

  return {
    supported,
    permission,
    settings,
    isTestSending,
    enablePushNotifications,
    disablePushNotifications,
    updateReminderTime,
    sendTestNotification,
  };
}
