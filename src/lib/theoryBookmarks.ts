"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TheoryBookmarkItem,
  VocabBreakdownWord,
  TargetSkill,
  SkillBandTarget,
} from "@/types/theoryBookmarks";
import { db } from "@/lib/db";

const STORAGE_KEY = "ielts_theory_bookmarks";
const BOOKMARK_EVENT = "ielts_theory_bookmarks_changed";

/**
 * Retrieve all saved bookmarks from local storage
 */
export function getSavedBookmarks(): TheoryBookmarkItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TheoryBookmarkItem[];
  } catch (e) {
    console.error("Error reading saved theory bookmarks:", e);
    return [];
  }
}

/**
 * Check if a bookmark ID is currently saved
 */
export function isBookmarkSaved(id: string): boolean {
  const list = getSavedBookmarks();
  return list.some((item) => item.id === id);
}

/**
 * Toggle saving/removing a theory bookmark
 */
export function toggleTheoryBookmark(
  item: Omit<TheoryBookmarkItem, "savedAt">
): boolean {
  if (typeof window === "undefined") return false;
  const list = getSavedBookmarks();
  const existingIdx = list.findIndex((b) => b.id === item.id);

  let isNowSaved = false;
  let updatedList: TheoryBookmarkItem[] = [];

  if (existingIdx >= 0) {
    // Remove
    updatedList = list.filter((b) => b.id !== item.id);
    isNowSaved = false;
  } else {
    // Add
    const newItem: TheoryBookmarkItem = {
      ...item,
      savedAt: new Date().toISOString(),
    };
    updatedList = [newItem, ...list];
    isNowSaved = true;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  window.dispatchEvent(new CustomEvent(BOOKMARK_EVENT, { detail: { id: item.id, isSaved: isNowSaved } }));
  return isNowSaved;
}

/**
 * Remove a specific theory bookmark by ID
 */
export function removeTheoryBookmark(id: string): void {
  if (typeof window === "undefined") return;
  const list = getSavedBookmarks();
  const updatedList = list.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  window.dispatchEvent(new CustomEvent(BOOKMARK_EVENT, { detail: { id, isSaved: false } }));
}

/**
 * Helper to save a vocabulary word from lesson excerpt directly into db.vocab_matrix
 */
export async function saveWordToVocabMatrix(params: {
  word: string;
  ipa?: string;
  type?: string;
  meaningVi: string;
  context: string;
  sourceModule?: string;
}): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const cleanWord = params.word.trim();
    if (!cleanWord) return false;

    // Check if word already exists in vocab matrix
    const existing = await db.vocab_matrix
      .where("word")
      .equalsIgnoreCase(cleanWord)
      .first();

    if (existing) {
      // Word already in matrix, mark it as learning if was new
      return true;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const newCard = {
      id: `vocab_bm_${Date.now()}_${cleanWord.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      word: cleanWord,
      ipa: params.ipa || `/${cleanWord}/`,
      meaning: params.type ? `[${params.type}] ${params.meaningVi}` : params.meaningVi,
      definitionEn: cleanWord,
      collocations: [cleanWord],
      originalContext: params.context || cleanWord,
      category: "c1_academic" as const,
      status: "new" as const,
      stepInterval: 1,
      nextReviewDate: todayStr,
      repetitionCount: 0,
      lapsesCount: 0,
      stability: 1.0,
      difficulty: 5.0,
      bandLevel: "Band 7.0+",
      sourceModule: params.sourceModule || "theory_lesson",
      createdAt: new Date().toISOString(),
    };

    await db.vocab_matrix.put(newCard);
    return true;
  } catch (err) {
    console.error("Error saving word to vocab matrix:", err);
    return false;
  }
}

/**
 * React hook to observe and interact with saved bookmarks reactively
 */
export function useTheoryBookmarks() {
  const [bookmarks, setBookmarks] = useState<TheoryBookmarkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const reload = useCallback(() => {
    setBookmarks(getSavedBookmarks());
  }, []);

  useEffect(() => {
    reload();
    setIsLoaded(true);

    const handleUpdate = () => {
      reload();
    };

    window.addEventListener(BOOKMARK_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(BOOKMARK_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [reload]);

  const checkIsSaved = useCallback(
    (id: string) => {
      return bookmarks.some((b) => b.id === id);
    },
    [bookmarks]
  );

  const toggle = useCallback(
    (item: Omit<TheoryBookmarkItem, "savedAt">) => {
      return toggleTheoryBookmark(item);
    },
    []
  );

  const remove = useCallback((id: string) => {
    removeTheoryBookmark(id);
  }, []);

  return {
    bookmarks,
    isLoaded,
    count: bookmarks.length,
    isSaved: checkIsSaved,
    toggleBookmark: toggle,
    removeBookmark: remove,
    reloadBookmarks: reload,
  };
}

/**
 * Calibrated Target Profile for Overall Band 7.5:
 * Strategy: Reading 8.5, Listening 8.0, Writing 6.5, Speaking 6.0
 * Overall = (8.5 + 8.0 + 6.5 + 6.0) / 4 = 29 / 4 = 7.25 -> rounds up to 7.5!
 */
export const TARGET_BAND_75_PROFILE = {
  reading: {
    skill: "reading" as TargetSkill,
    targetBand: "8.5",
    badgeLabel: "8.5 Read",
    badgeText: "Cần cho 8.5 Read",
    buttonLabel: "8.5 Read",
    labelVi: "Mục tiêu 8.5 Reading",
    themeColor: "sky" as const,
    defaultReasonVi: "Từ vựng học thuật C1-C2 & paraphrase then chốt cho mục tiêu 8.5 Reading",
  },
  listening: {
    skill: "listening" as TargetSkill,
    targetBand: "8.0",
    badgeLabel: "8.0 Lis",
    badgeText: "Cần cho 8.0 Lis",
    buttonLabel: "8.0 Lis",
    labelVi: "Mục tiêu 8.0 Listening",
    themeColor: "indigo" as const,
    defaultReasonVi: "Từ vựng học thuật Sec 3-4 & bẫy tín hiệu nghe ăn điểm 8.0 Listening",
  },
  writing: {
    skill: "writing" as TargetSkill,
    targetBand: "6.5",
    badgeLabel: "6.5 Wri",
    badgeText: "Cần cho 6.5 Wri",
    buttonLabel: "6.5 Wri",
    labelVi: "Mục tiêu 6.5 Writing",
    themeColor: "amber" as const,
    defaultReasonVi: "Collocation chuẩn xác & liên từ thực dụng cho 6.5 Writing (tránh từ hiếm gượng gạo)",
  },
  speaking: {
    skill: "speaking" as TargetSkill,
    targetBand: "6.0",
    badgeLabel: "6.0 Speak",
    badgeText: "Cần cho 6.0 Speak",
    buttonLabel: "6.0 Speak",
    labelVi: "Mục tiêu 6.0 Speaking",
    themeColor: "emerald" as const,
    defaultReasonVi: "Cụm từ tự nhiên & từ nối đệm trôi chảy cho mục tiêu 6.0 Speaking",
  },
  grammar: {
    skill: "grammar" as TargetSkill,
    targetBand: "6.5+",
    badgeLabel: "7.5 (Cú pháp 6.5+)",
    badgeText: "Chuẩn 7.5 (Cú pháp 6.5+)",
    buttonLabel: "7.5 (Cú pháp 6.5+)",
    labelVi: "Mục tiêu 7.5 (Cú pháp 6.5+)",
    themeColor: "amber" as const,
    defaultReasonVi: "Cấu trúc & từ vựng ngữ pháp chuẩn điểm nâng band toàn diện 7.5",
  },
} as const;

/**
 * Common high-frequency C1/C2 Academic keywords and patterns that boost scores
 */
const HIGH_YIELD_BAND75_PATTERNS = [
  "idiosyncratic", "indigenous", "paradoxical", "corroborate", "mitigate",
  "nuance", "tentative", "conducive", "robust", "substantiate", "proponent",
  "deteriorate", "proliferation", "epitome", "meticulous", "ubiquitous",
  "prerequisite", "counterpart", "leverage", "exacerbate", "divergence",
  "pivotal", "salient", "lucrative", "unprecedented", "quintessential",
  "empirical", "overarching", "coherent", "plausible", "succinct", "repertoire",
  "spontaneous", "discern", "intricate", "discrepancy", "phenomenon",
  "comprehensive", "synthesize", "reconcile", "underpin", "accentuate",
  "passionate", "broaden", "unwind", "crucial", "fundamental", "vital",
  "transform", "catalyst", "cornerstone", "paramount", "feasible"
];

/**
 * Determine if a vocabulary word is recommended for the target band profile (8.5 Read / 8.0 Lis / 6.5 Wri / 6.0 Speak)
 */
export function isRecommendedBand75Word(
  item: VocabBreakdownWord,
  skill?: TargetSkill
): boolean {
  if (typeof item.isRecommended === "boolean") {
    return item.isRecommended;
  }

  const effectiveSkill: TargetSkill =
    skill || item.skill || (
      item.type.includes("idiom") || item.type.includes("spoken")
        ? "speaking"
        : item.type.includes("linking") || item.type.includes("transition")
        ? "writing"
        : "reading"
    );

  const clean = item.word.toLowerCase().trim();

  // If item has an explicit band target matching the skill
  if (item.bandTarget) {
    if (effectiveSkill === "reading" && (item.bandTarget.includes("8.5") || item.bandTarget.includes("8.0") || item.bandTarget.includes("7.5"))) return true;
    if (effectiveSkill === "listening" && (item.bandTarget.includes("8.0") || item.bandTarget.includes("7.5"))) return true;
    if (effectiveSkill === "writing" && (item.bandTarget.includes("6.5") || item.bandTarget.includes("7.0") || item.bandTarget.includes("7.5"))) return true;
    if (effectiveSkill === "speaking" && (item.bandTarget.includes("6.0") || item.bandTarget.includes("6.5") || item.bandTarget.includes("7.5"))) return true;
  }

  // Skill-specific heuristics
  if (effectiveSkill === "speaking") {
    // For Speaking 6.0: natural spoken collocations, idioms, phrasal verbs, discourse markers
    if (
      item.type.includes("phrase") ||
      item.type.includes("collocation") ||
      item.type.includes("idiom") ||
      item.type.includes("spoken") ||
      clean.includes(" ")
    ) {
      return true;
    }
    if (["actually", "honestly", "passionate", "broaden", "unwind", "crucial", "vital", "leverage", "spontaneous"].some(w => clean.includes(w))) {
      return true;
    }
    return false;
  }

  if (effectiveSkill === "writing") {
    // For Writing 6.5: clear topic collocations, cohesive linkers, solid B2-C1 academic vocabulary
    if (
      item.type.includes("collocation") ||
      item.type.includes("linking") ||
      item.type.includes("transition") ||
      item.type.includes("phrase") ||
      clean.includes(" ")
    ) {
      return true;
    }
    if (HIGH_YIELD_BAND75_PATTERNS.some((w) => clean.includes(w))) {
      return true;
    }
    if (clean.length >= 7 && !clean.includes(" ")) {
      return true;
    }
    return false;
  }

  if (effectiveSkill === "listening") {
    // For Listening 8.0: Section 3-4 academic vocabulary, lecture signposts, distractors
    if (item.type.includes("phrase") || item.type.includes("collocation") || clean.includes(" ")) {
      return true;
    }
    if (HIGH_YIELD_BAND75_PATTERNS.some((w) => clean.includes(w))) {
      return true;
    }
    if (clean.length >= 7 && !clean.includes(" ")) {
      return true;
    }
    return false;
  }

  // Reading 8.5: Receptive C1-C2 academic words, AWL, abstract nominalizations
  if (item.type.includes("phrase") || item.type.includes("collocation") || clean.includes(" ")) {
    return true;
  }
  if (HIGH_YIELD_BAND75_PATTERNS.some((w) => clean.includes(w))) {
    return true;
  }
  if (clean.length >= 7 && !clean.includes(" ")) {
    return true;
  }
  return false;
}

/**
 * Return display badge metadata calibrated for the skill's target band in the 7.5 overall strategy
 */
export function getRecommendationBadgeInfo(
  item: VocabBreakdownWord,
  skill?: TargetSkill
): {
  isRecommended: boolean;
  bandTarget: string;
  badgeText: string;
  reasonVi: string;
  skill: TargetSkill;
  buttonLabel: string;
  themeColor: "sky" | "indigo" | "amber" | "emerald";
} {
  const effectiveSkill: TargetSkill =
    skill || item.skill || (
      item.type.includes("idiom") || item.type.includes("spoken")
        ? "speaking"
        : item.type.includes("linking") || item.type.includes("transition")
        ? "writing"
        : "reading"
    );

  const profile = TARGET_BAND_75_PROFILE[effectiveSkill] || TARGET_BAND_75_PROFILE.reading;
  const isRec = isRecommendedBand75Word(item, effectiveSkill);
  const band = item.bandTarget || profile.badgeLabel;

  let reason = item.recommendationReasonVi;
  if (!reason) {
    if (item.type.includes("collocation") || item.word.includes(" ")) {
      if (effectiveSkill === "speaking") {
        reason = "Cụm Collocation tự nhiên giúp giao tiếp trôi chảy cho Speaking 6.0";
      } else if (effectiveSkill === "writing") {
        reason = "Collocation chuẩn xác & đắt giá cho Writing 6.5 (tránh từ hiếm sai ngữ cảnh)";
      } else if (effectiveSkill === "listening") {
        reason = "Cụm từ then chốt thường xuất hiện trong Sec 3-4 Listening 8.0";
      } else {
        reason = "Cụm Collocation học thuật then chốt cho mục tiêu 8.5 Reading";
      }
    } else if (item.type.includes("phrase") || item.type.includes("idiom")) {
      reason = effectiveSkill === "speaking"
        ? "Thành ngữ & diễn đạt nói tự nhiên ghi điểm Fluency cho Speaking 6.0"
        : "Cụm diễn đạt học thuật tự nhiên";
    } else {
      reason = profile.defaultReasonVi;
    }
  }

  return {
    isRecommended: isRec,
    bandTarget: band,
    badgeText: profile.badgeText,
    reasonVi: reason,
    skill: effectiveSkill,
    buttonLabel: profile.buttonLabel,
    themeColor: profile.themeColor,
  };
}

