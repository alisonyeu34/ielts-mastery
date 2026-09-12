import { NextRequest, NextResponse } from "next/server";
import { serverDictionaryCache, serverNegativeCache, prewarmAcademicDictionaryCache } from "@/lib/serverCache";
import { ACADEMIC_DICTIONARY_SEED } from "@/data/academicDictionarySeed";

// Pre-warm dictionary memory cache with 500+ academic items at server startup
prewarmAcademicDictionaryCache(ACADEMIC_DICTIONARY_SEED);

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

const COMMON_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
  "Vary": "Accept-Encoding",
};

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(req.url);
  const rawWord = searchParams.get("word") || "";
  const cleaned = rawWord.toLowerCase().trim().replace(/^[^\w]+|[^\w]+$/g, "");

  if (!cleaned) {
    return NextResponse.json({ error: "Word parameter is required" }, { status: 400 });
  }

  // 1. Check in-memory LRU cache (< 0.2ms)
  const cached = serverDictionaryCache.get(cleaned);
  if (cached) {
    const duration = Date.now() - startTime;
    return NextResponse.json(cached, {
      headers: {
        "X-Cache": "HIT",
        "X-Response-Time": `${duration}ms`,
        ...COMMON_CACHE_HEADERS,
      },
    });
  }

  // 2. Check negative cache: if previously failed/not found, bypass external API instantly (< 0.1ms)
  if (serverNegativeCache.has(cleaned)) {
    const duration = Date.now() - startTime;
    const fallbackResult: DictionaryResult = {
      word: cleaned,
      phonetic: "",
      meanings: [
        {
          partOfSpeech: "academic term",
          definitions: [
            {
              definition: "Thuật ngữ học thuật trích xuất từ bài thi. Bấm 'Lưu vào Sổ Từ Vựng FSRS' để luyện nhớ ngắt quãng.",
            },
          ],
        },
      ],
      source: "offline_cache",
    };
    return NextResponse.json(fallbackResult, {
      headers: {
        "X-Cache": "NEGATIVE-HIT",
        "X-Response-Time": `${duration}ms`,
        ...COMMON_CACHE_HEADERS,
      },
    });
  }

  // 3. Fast-Path: Check pre-warmed Academic Dictionary Seed (< 0.2ms)
  const seedEntry = ACADEMIC_DICTIONARY_SEED[cleaned];
  if (seedEntry) {
    const result: DictionaryResult = {
      word: seedEntry.word,
      phonetic: seedEntry.phonetic,
      meanings: seedEntry.meanings,
      vietnameseMeaning: seedEntry.vietnameseMeaning,
      source: "offline_cache",
    };
    serverDictionaryCache.set(cleaned, result);
    const duration = Date.now() - startTime;
    return NextResponse.json(result, {
      headers: {
        "X-Cache": "HIT-LOCAL",
        "X-Response-Time": `${duration}ms`,
        ...COMMON_CACHE_HEADERS,
      },
    });
  }

  // 4. For rare words not in local seed: Fetch from Free Dictionary API with strict 750ms timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 750);

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleaned)}`,
      {
        signal: controller.signal,
        next: { revalidate: 86400 },
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        const phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || "";
        const audioUrl = entry.phonetics?.find((p: any) => p.audio && p.audio.length > 0)?.audio;

        const parsedMeanings: DictionaryMeaning[] = (entry.meanings || []).map((m: any) => ({
          partOfSpeech: m.partOfSpeech || "unknown",
          definitions: (m.definitions || []).map((d: any) => ({
            definition: d.definition,
            example: d.example,
            synonyms: d.synonyms,
          })),
        }));

        const result: DictionaryResult = {
          word: entry.word || cleaned,
          phonetic,
          audioUrl,
          meanings: parsedMeanings,
          source: "api",
        };

        serverDictionaryCache.set(cleaned, result);
        const duration = Date.now() - startTime;
        return NextResponse.json(result, {
          headers: {
            "X-Cache": "MISS",
            "X-Response-Time": `${duration}ms`,
            ...COMMON_CACHE_HEADERS,
          },
        });
      }
    }
  } catch {
    clearTimeout(timeoutId);
  }

  // 5. Memorize in Negative Cache and return instant Fallback resolution (< 1ms)
  serverNegativeCache.set(cleaned, true);

  const fallbackResult: DictionaryResult = {
    word: cleaned,
    phonetic: "",
    meanings: [
      {
        partOfSpeech: "academic term",
        definitions: [
          {
            definition: "Thuật ngữ học thuật trích xuất từ bài thi. Bấm 'Lưu vào Sổ Từ Vựng FSRS' để luyện nhớ ngắt quãng.",
          },
        ],
      },
    ],
    source: "offline_cache",
  };

  serverDictionaryCache.set(cleaned, fallbackResult);
  const duration = Date.now() - startTime;
  return NextResponse.json(fallbackResult, {
    headers: {
      "X-Cache": "FALLBACK",
      "X-Response-Time": `${duration}ms`,
      ...COMMON_CACHE_HEADERS,
    },
  });
}
