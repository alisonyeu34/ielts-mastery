"use client";

import { useSyncExternalStore } from "react";

// Global set of item IDs whose theory content is currently masked for active recall
const maskedItemIds = new Set<string>();
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * Sets whether an item's theory content should be masked
 */
export function setRecallItemMasked(itemId: string, isMasked: boolean) {
  if (isMasked) {
    maskedItemIds.add(itemId);
  } else {
    maskedItemIds.delete(itemId);
  }
  notifyListeners();
}

/**
 * Checks synchronously if an item is currently masked
 */
export function isRecallItemMasked(itemId: string): boolean {
  return maskedItemIds.has(itemId);
}

/**
 * React hook to subscribe to mask state for a specific theory item
 */
export function useIsRecallItemMasked(itemId: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    () => maskedItemIds.has(itemId),
    () => false // Server-side rendering fallback
  );
}
