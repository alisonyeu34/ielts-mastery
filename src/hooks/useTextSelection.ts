"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

export interface SelectionPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface UseTextSelectionReturn {
  selectedText: string;
  surroundingSentence: string;
  position: SelectionPosition | null;
  clearSelection: () => void;
}

/**
 * Extract complete sentence surrounding a selection range
 */
export function extractSentenceFromNode(text: string, selectedText: string): string {
  if (!text || !selectedText) return selectedText || "";

  const trimmed = selectedText.trim();
  const index = text.indexOf(trimmed);
  if (index === -1) return selectedText;

  // Search backwards for sentence start delimiter (. ! ? or beginning)
  let start = index;
  while (start > 0 && !/[.!?\n]/.test(text[start - 1])) {
    start--;
  }

  // Search forwards for sentence end delimiter (. ! ? or end)
  let end = index + trimmed.length;
  while (end < text.length && !/[.!?\n]/.test(text[end])) {
    end++;
  }
  if (end < text.length && /[.!?]/.test(text[end])) {
    end++; // include punctuation
  }

  const fullSentence = text.substring(start, end).trim();
  return fullSentence || selectedText;
}

export function useTextSelection(containerRef: RefObject<HTMLElement>): UseTextSelectionReturn {
  const [selectedText, setSelectedText] = useState("");
  const [surroundingSentence, setSurroundingSentence] = useState("");
  const [position, setPosition] = useState<SelectionPosition | null>(null);

  const handleSelectionChange = useCallback(() => {
    if (typeof window === "undefined") return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      // Don't immediately clear if clicking toolbar
      return;
    }

    const text = selection.toString().trim();
    if (!text || text.length < 2) {
      return;
    }

    const range = selection.getRangeAt(0);
    const container = containerRef.current;

    // Ensure selection is inside our designated container
    if (container && container.contains(range.commonAncestorContainer)) {
      const rect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Find whole sentence
      const parentNodeText = range.commonAncestorContainer.textContent || "";
      const sentence = extractSentenceFromNode(parentNodeText, text);

      setSelectedText(text);
      setSurroundingSentence(sentence);
      setPosition({
        top: rect.top - containerRect.top + container.scrollTop,
        left: rect.left - containerRect.left + rect.width / 2,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [containerRef]);

  const clearSelection = useCallback(() => {
    setSelectedText("");
    setSurroundingSentence("");
    setPosition(null);
    if (typeof window !== "undefined") {
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
    }
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(handleSelectionChange, 10);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("touchend", handleMouseUp);
      }
    };
  }, [containerRef, handleSelectionChange]);

  return {
    selectedText,
    surroundingSentence,
    position,
    clearSelection,
  };
}
