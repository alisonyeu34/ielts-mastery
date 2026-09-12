"use client";

export interface PushNotificationSettings {
  enabled: boolean;
  reminderTime: string; // HH:mm format, e.g. "20:00"
  lastNotifiedDate: string; // YYYY-MM-DD
}

const SETTINGS_KEY = "ielts_push_notification_settings";

const DEFAULT_SETTINGS: PushNotificationSettings = {
  enabled: false,
  reminderTime: "20:00",
  lastNotifiedDate: "",
};

/**
 * Check if the browser supports Desktop Web Notifications
 */
export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

/**
 * Get current browser notification permission
 */
export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return "denied";
  return Notification.permission;
}

/**
 * Register the Service Worker for push handling
 */
export async function registerPushServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    return reg;
  } catch (err) {
    console.warn("ServiceWorker registration failed:", err);
    return null;
  }
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    return "denied";
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await registerPushServiceWorker();
    }
    return permission;
  } catch (err) {
    console.error("Error requesting notification permission:", err);
    return "denied";
  }
}

/**
 * Send an immediate Desktop Push Notification
 */
export async function sendDesktopNotification(options: {
  title: string;
  body: string;
  icon?: string;
  url?: string;
  tag?: string;
}): Promise<boolean> {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }

  const {
    title,
    body,
    icon = "/icons/icon-192.png",
    url = "/vocab",
    tag = "ielts-forme-notification",
  } = options;

  try {
    // Try Service Worker registration first (works best in modern browsers)
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready.catch(() => null);
      if (reg && reg.showNotification) {
        await reg.showNotification(title, {
          body,
          icon,
          badge: icon,
          tag,
          data: { url },
          // vibrate on supported mobile devices
          vibrate: [200, 100, 200],
        } as NotificationOptions);
        return true;
      }
    }

    // Fallback to standard Window Notification API
    const notification = new Notification(title, {
      body,
      icon,
      badge: icon,
      tag,
      data: { url },
    });

    notification.onclick = (e) => {
      e.preventDefault();
      window.focus();
      if (url && typeof window !== "undefined") {
        window.location.href = url;
      }
      notification.close();
    };

    return true;
  } catch (err) {
    console.error("Failed to show desktop notification:", err);
    return false;
  }
}

/**
 * Load push notification settings from localStorage
 */
export function getPushSettings(): PushNotificationSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save push notification settings to localStorage
 */
export function savePushSettings(settings: Partial<PushNotificationSettings>): PushNotificationSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const current = getPushSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Check if the scheduled daily reminder should fire right now
 */
export async function checkScheduledReminder(dueVocabCount = 0, unresolvedErrorsCount = 0): Promise<boolean> {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }

  const settings = getPushSettings();
  if (!settings.enabled) return false;

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  // If already notified today, skip
  if (settings.lastNotifiedDate === todayStr) {
    return false;
  }

  const [targetHour, targetMinute] = settings.reminderTime.split(":").map(Number);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Check if current time has passed the reminder target time today
  const isTimeReached =
    currentHour > targetHour ||
    (currentHour === targetHour && currentMinute >= targetMinute);

  if (!isTimeReached) {
    return false;
  }

  // Compose dynamic reminder message
  let title = "📚 [IELTS for ME] Đã đến giờ ôn tập hôm nay!";
  let body = "Hãy duy trì chuỗi học tập để bứt phá mục tiêu Band 7.5.";
  let targetUrl = "/vocab";

  if (dueVocabCount > 0 && unresolvedErrorsCount > 0) {
    body = `Hôm nay bạn có ${dueVocabCount} từ vựng FSRS đến hạn và ${unresolvedErrorsCount} lỗi sai cần khắc phục. Bấm để luyện tập ngay!`;
    targetUrl = "/vocab";
  } else if (dueVocabCount > 0) {
    body = `Hôm nay bạn có ${dueVocabCount} từ vựng FSRS đến hạn cần ôn ngắt quãng. Đừng để não bộ lãng quên!`;
    targetUrl = "/vocab";
  } else if (unresolvedErrorsCount > 0) {
    title = "🛡️ [IELTS for ME] Nhắc nhở khắc phục lỗi sai!";
    body = `Bạn có ${unresolvedErrorsCount} lỗi sai trong Error Bank cần drill lại. Bấm để mở phòng luyện tập!`;
    targetUrl = "/error-bank/drill";
  }

  const sent = await sendDesktopNotification({
    title,
    body,
    url: targetUrl,
    tag: "ielts-daily-reminder",
  });

  if (sent) {
    savePushSettings({ lastNotifiedDate: todayStr });
  }

  return sent;
}
