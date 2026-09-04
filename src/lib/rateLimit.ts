/**
 * Sliding Window In-Memory Rate Limiter
 * Protects critical transaction endpoints (e.g. /api/orders, /api/auth/login)
 * against rapid request spam, card testing, and scraping.
 */

interface RateLimitRecord {
  timestamps: number[];
}

class SlidingWindowRateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();

  /**
   * Check whether an action for an identifier (e.g., client IP or token) is within limits.
   * @param key Identifier for the requester
   * @param maxRequests Maximum allowed requests in window
   * @param windowSeconds Duration of window in seconds
   * @returns { allowed: boolean, remaining: number, resetSeconds: number }
   */
  check(key: string, maxRequests = 60, windowSeconds = 60): { allowed: boolean; remaining: number; resetSeconds: number } {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const windowStart = now - windowMs;

    let record = this.records.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(key, record);
    }

    // Filter out timestamps older than the window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= maxRequests) {
      const oldestTs = record.timestamps[0];
      const resetSeconds = Math.ceil((oldestTs + windowMs - now) / 1000);
      return { allowed: false, remaining: 0, resetSeconds: Math.max(1, resetSeconds) };
    }

    record.timestamps.push(now);
    return {
      allowed: true,
      remaining: maxRequests - record.timestamps.length,
      resetSeconds: windowSeconds,
    };
  }

  /**
   * Cleanup stale records periodically to avoid memory growth.
   */
  cleanup(): void {
    const now = Date.now();
    const windowMs = 300000; // 5 minutes
    this.records.forEach((record, key) => {
      record.timestamps = record.timestamps.filter((ts) => ts > now - windowMs);
      if (record.timestamps.length === 0) {
        this.records.delete(key);
      }
    });
  }

  getActiveKeysCount(): number {
    return this.records.size;
  }
}

export const rateLimiter = new SlidingWindowRateLimiter();

// Periodically clean up every 5 minutes in background
if (typeof setInterval !== 'undefined') {
  setInterval(() => rateLimiter.cleanup(), 300000);
}
