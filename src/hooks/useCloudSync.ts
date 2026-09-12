"use client";

import { useState, useEffect, useCallback } from "react";
import {
  SyncMetrics,
  getCloudSyncMetrics,
  executeTwoWayCloudSync,
  exportLocalDatabaseAsJSON,
  importLocalDatabaseFromJSON,
} from "@/lib/cloudSyncEngine";

export function useCloudSync() {
  const [metrics, setMetrics] = useState<SyncMetrics>({
    state: "pending",
    lastSyncedAt: null,
    pendingChangesCount: 0,
    totalLocalRecords: 0,
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  const refreshMetrics = useCallback(async () => {
    const updated = await getCloudSyncMetrics();
    setMetrics(updated);
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    refreshMetrics();

    const handleOnline = () => {
      refreshMetrics();
      // Auto trigger sync on reconnect
      triggerCloudSync();
    };

    const handleOffline = () => {
      refreshMetrics();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [refreshMetrics]);

  // Trigger Two-Way Sync
  const triggerCloudSync = useCallback(async () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);

    try {
      const res = await executeTwoWayCloudSync();
      setSyncSuccessMessage(`Đã đồng bộ thành công ${res.syncedCount} bản ghi lên đám mây!`);
      await refreshMetrics();
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error("Cloud Sync Error:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [refreshMetrics]);

  // Export JSON Backup File
  const handleExportBackup = useCallback(async () => {
    const jsonStr = await exportLocalDatabaseAsJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ielts_forme_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Import JSON Backup File
  const handleImportBackup = useCallback(async (file: File) => {
    const text = await file.text();
    const result = await importLocalDatabaseFromJSON(text);
    await refreshMetrics();
    setSyncSuccessMessage(`Đã khôi phục thành công ${result.importedCount} bản ghi từ tệp sao lưu!`);
    setTimeout(() => setSyncSuccessMessage(null), 4000);
  }, [refreshMetrics]);

  return {
    metrics,
    isSyncing,
    syncSuccessMessage,
    triggerCloudSync,
    refreshMetrics,
    exportBackup: handleExportBackup,
    importBackup: handleImportBackup,
  };
}
