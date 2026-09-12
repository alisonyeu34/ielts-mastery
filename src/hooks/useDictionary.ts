"use client";

import { useState, useCallback } from "react";
import { cleanWord } from "@/lib/diffEngine";

export interface DictionaryDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
}

export interface DictionaryMeaning {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
}

export interface DictionaryResult {
  word: string;
  phonetic?: string;
  audioUrl?: string;
  meanings: DictionaryMeaning[];
  vietnameseMeaning?: string;
  source: "api" | "offline_cache";
}

// Built-in academic fallback dictionary for offline resiliency
const OFFLINE_ACADEMIC_DICT: Record<string, Partial<DictionaryResult>> = {
  mitigate: {
    word: "mitigate",
    phonetic: "/ˈmɪt.ɪ.ɡeɪt/",
    vietnameseMeaning: "Làm dịu bớt, giảm nhẹ mức độ nghiêm trọng hoặc tác hại",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Make something less severe, serious, or painful.",
            example: "Drainage schemes have helped to mitigate the risk of flooding.",
          },
        ],
      },
    ],
  },
  detrimental: {
    word: "detrimental",
    phonetic: "/ˌdet.rɪˈmen.təl/",
    vietnameseMeaning: "Gây tổn hại, có hại nghiêm trọng",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Tending to cause harm or damage.",
            example: "Releasing these chemicals has a detrimental effect on the environment.",
          },
        ],
      },
    ],
  },
  comprise: {
    word: "comprise",
    phonetic: "/kəmˈpraɪz/",
    vietnameseMeaning: "Bao gồm, cấu thành nên, chiếm tỷ trọng",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Consist of; be made up of.",
            example: "The country comprises twenty distinct administrative regions.",
          },
        ],
      },
    ],
  },
  allocate: {
    word: "allocate",
    phonetic: "/ˈæl.ə.keɪt/",
    vietnameseMeaning: "Phân bổ, chỉ định tài nguyên hoặc ngân sách",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "Distribute (resources or duties) for a particular purpose.",
            example: "The government allocated financial subsidies to renewable research.",
          },
        ],
      },
    ],
  },
  empirical: {
    word: "empirical",
    phonetic: "/ɪmˈpɪr.ɪ.kəl/",
    vietnameseMeaning: "Thực nghiệm, dựa trên quan sát và bằng chứng thực tế",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.",
            example: "They provided empirical evidence to corroborate their hypothesis.",
          },
        ],
      },
    ],
  },
  ubiquitous: {
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wə.t̬əs/",
    vietnameseMeaning: "Phổ biến khắp nơi, có mặt ở mọi nơi",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Present, appearing, or found everywhere.",
            example: "Cowboy boots were once ubiquitous among American cattle ranchers.",
          },
        ],
      },
    ],
  },
};

export function useDictionary() {
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupWord = useCallback(async (rawWord: string) => {
    const cleaned = cleanWord(rawWord);
    if (!cleaned) return;

    setIsLoading(true);
    setError(null);

    // Check offline dictionary first if present
    const cached = OFFLINE_ACADEMIC_DICT[cleaned];

    try {
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(cleaned)}`);

      if (response.ok) {
        const data: DictionaryResult = await response.json();
        setResult(data);
        setIsLoading(false);
        return;
      }

      // Fallback to cached entry if API fails or word is not found
      if (cached) {
        setResult({
          word: cached.word || cleaned,
          phonetic: cached.phonetic,
          meanings: cached.meanings || [],
          vietnameseMeaning: cached.vietnameseMeaning,
          source: "offline_cache",
        });
      } else {
        // Simple fallback
        setResult({
          word: cleaned,
          phonetic: "",
          meanings: [
            {
              partOfSpeech: "academic term",
              definitions: [
                {
                  definition: `Từ vựng học thuật trích xuất từ bài đọc. Bấm 'Lưu vào FSRS' để học sâu.`,
                },
              ],
            },
          ],
          source: "offline_cache",
        });
      }
    } catch (err) {
      if (cached) {
        setResult({
          word: cached.word || cleaned,
          phonetic: cached.phonetic,
          meanings: cached.meanings || [],
          vietnameseMeaning: cached.vietnameseMeaning,
          source: "offline_cache",
        });
      } else {
        setError("Không thể tra từ điển lúc này.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    result,
    isLoading,
    error,
    lookupWord,
    clearResult: () => setResult(null),
  };
}
