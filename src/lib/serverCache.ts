/**
 * High-performance, zero-dependency In-Memory LRU Cache with TTL support.
 * Designed for sub-millisecond response times in Next.js Server Runtimes.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class MemoryLRUCache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxEntries: number;
  private defaultTtlMs: number;
  public hits: number = 0;
  public misses: number = 0;

  constructor(maxEntries = 500, defaultTtlMs = 2 * 60 * 60 * 1000) { // 2 hours default
    this.cache = new Map();
    this.maxEntries = maxEntries;
    this.defaultTtlMs = defaultTtlMs;
  }

  /**
   * Fast FNV-1a 32-bit string hash for compact, fast cache keys
   */
  public static hashKey(input: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0;
    }
    return hash.toString(36);
  }

  public get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Refresh LRU order: delete and re-insert
    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits++;
    return entry.value;
  }

  public set(key: string, value: T, ttlMs?: number): void {
    const ttl = ttlMs ?? this.defaultTtlMs;
    const expiresAt = Date.now() + ttl;

    // Evict oldest if limit reached
    if (this.cache.size >= this.maxEntries && !this.cache.has(key)) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, { value, expiresAt });
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }

  public getMetrics() {
    const total = this.hits + this.misses;
    const hitRatePercent = total > 0 ? Math.round((this.hits / total) * 100) : 0;
    return {
      size: this.cache.size,
      maxEntries: this.maxEntries,
      hits: this.hits,
      misses: this.misses,
      hitRatePercent,
    };
  }
}

// Global singletons for server memory reuse across warm requests
const globalForCache = globalThis as unknown as {
  aiWritingCache?: MemoryLRUCache<any>;
  aiSpeakingCache?: MemoryLRUCache<any>;
  aiAssistantCache?: MemoryLRUCache<any>;
  dictionaryCache?: MemoryLRUCache<any>;
  negativeCache?: MemoryLRUCache<boolean>;
  isDictionaryPrewarmed?: boolean;
};

export const aiWritingCache =
  globalForCache.aiWritingCache || (globalForCache.aiWritingCache = new MemoryLRUCache(400, 3 * 3600 * 1000));

export const aiSpeakingCache =
  globalForCache.aiSpeakingCache || (globalForCache.aiSpeakingCache = new MemoryLRUCache(400, 3 * 3600 * 1000));

export const aiAssistantCache =
  globalForCache.aiAssistantCache || (globalForCache.aiAssistantCache = new MemoryLRUCache(600, 6 * 3600 * 1000));

export const serverDictionaryCache =
  globalForCache.dictionaryCache || (globalForCache.dictionaryCache = new MemoryLRUCache(3000, 48 * 3600 * 1000));

// Negative cache: memorizes not-found queries for 10 minutes to prevent repeat external API roundtrips
export const serverNegativeCache =
  globalForCache.negativeCache || (globalForCache.negativeCache = new MemoryLRUCache(1000, 10 * 60 * 1000));

/**
 * Pre-warm the in-memory dictionary cache with all academic seed words for instant < 0.2ms access
 */
export function prewarmAcademicDictionaryCache(seedWords: Record<string, any>): number {
  if (globalForCache.isDictionaryPrewarmed) {
    return serverDictionaryCache.size();
  }

  let count = 0;
  for (const [key, item] of Object.entries(seedWords)) {
    if (!serverDictionaryCache.has(key)) {
      serverDictionaryCache.set(key, {
        word: item.word,
        phonetic: item.phonetic,
        meanings: item.meanings,
        vietnameseMeaning: item.vietnameseMeaning,
        source: "offline_cache",
      });
      count++;
    }
  }

  globalForCache.isDictionaryPrewarmed = true;
  return count;
}
