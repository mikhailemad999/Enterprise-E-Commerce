/**
 * Enterprise High-Concurrency In-Memory TTL Cache
 * Provides low-latency caching for frequent read endpoints (products, stats, categories)
 * to absorb high traffic surges (1,000+ buyers/day) without database saturation.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class MemoryCache {
  private store: Map<string, CacheEntry<any>> = new Map();
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
  };

  /**
   * Retrieve cached value if unexpired.
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return entry.value as T;
  }

  /**
   * Set value in cache with TTL in milliseconds. Default: 30 seconds.
   */
  set<T>(key: string, value: T, ttlMs = 30000): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
    this.stats.sets++;
  }

  /**
   * Invalidate a single key or keys matching prefix.
   */
  invalidate(keyOrPrefix: string): void {
    this.store.forEach((_, key) => {
      if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
        this.store.delete(key);
      }
    });
  }

  /**
   * Clear all cached keys.
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get telemetry stats for observability dashboard.
   */
  getTelemetry() {
    const now = Date.now();
    let activeEntries = 0;
    this.store.forEach((entry) => {
      if (entry.expiresAt > now) activeEntries++;
    });

    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRatePercent = totalRequests > 0 ? Number(((this.stats.hits / totalRequests) * 100).toFixed(1)) : 100;


    return {
      activeEntries,
      hitCount: this.stats.hits,
      missCount: this.stats.misses,
      hitRatePercent,
    };
  }
}

export const memoryCache = new MemoryCache();
