import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cache = new Map<string, any>();

  set(key: string, value: any, ttl?: number): void {
    const item = {
      value,
      expiry: ttl ? Date.now() + ttl : null
    };
    this.cache.set(key, item);
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: string): boolean {
    return this.cache.has(key) && this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
