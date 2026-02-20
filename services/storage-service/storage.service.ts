import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * AsyncStorageService
 *
 * A typed wrapper around @react-native-async-storage/async-storage.
 * Automatically serialises/deserialises JSON values.
 *
 * Usage:
 *   await AsyncStorageService.set("user", { id: 1, name: "Alice" });
 *   const user = await AsyncStorageService.get<{ id: number; name: string }>("user");
 *   await AsyncStorageService.delete("user");
 *   await AsyncStorageService.clear();
 */
export class AsyncStorageService {
  // ─── Write ────────────────────────────────────────────────────────────────

  /**
   * Store a value. Objects/arrays are JSON-serialised automatically.
   */
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      const serialised =
        typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, serialised);
    } catch (error) {
      console.error(`[AsyncStorageService] set("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Store multiple key/value pairs in a single call.
   */
  static async setMany<T>(entries: Record<string, T>): Promise<void> {
    try {
      const pairs: [string, string][] = Object.entries(entries).map(
        ([key, value]) => [
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        ],
      );
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error(`[AsyncStorageService] setMany() failed:`, error);
      throw error;
    }
  }

  // ─── Read ─────────────────────────────────────────────────────────────────

  /**
   * Retrieve a value. Returns `null` when the key does not exist.
   * Attempts JSON.parse; falls back to the raw string if parsing fails.
   */
  static async get<T = string>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw === null) return null;

      try {
        return JSON.parse(raw) as T;
      } catch {
        // Not JSON — return as-is
        return raw as unknown as T;
      }
    } catch (error) {
      console.error(`[AsyncStorageService] get("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Retrieve multiple keys at once.
   * Returns a Record where missing keys map to `null`.
   */
  static async getMany<T = string>(
    keys: string[],
  ): Promise<Record<string, T | null>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return Object.fromEntries(
        pairs.map(([key, raw]) => {
          if (raw === null) return [key, null];
          try {
            return [key, JSON.parse(raw) as T];
          } catch {
            return [key, raw as unknown as T];
          }
        }),
      );
    } catch (error) {
      console.error(`[AsyncStorageService] getMany() failed:`, error);
      throw error;
    }
  }

  /**
   * Returns all stored keys.
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch (error) {
      console.error(`[AsyncStorageService] getAllKeys() failed:`, error);
      throw error;
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  /**
   * Remove a single key.
   */
  static async delete(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[AsyncStorageService] delete("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Remove multiple keys in a single call.
   */
  static async deleteMany(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error(`[AsyncStorageService] deleteMany() failed:`, error);
      throw error;
    }
  }

  /**
   * Wipe every key in AsyncStorage. Use with caution.
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`[AsyncStorageService] clear() failed:`, error);
      throw error;
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Returns `true` if the key exists in storage.
   */
  static async has(key: string): Promise<boolean> {
    const value = await AsyncStorageService.get(key);
    return value !== null;
  }

  /**
   * Merge a partial object into an existing stored object.
   * If the key doesn't exist yet the value is stored as-is.
   */
  static async merge<T extends object>(
    key: string,
    value: Partial<T>,
  ): Promise<void> {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[AsyncStorageService] merge("${key}") failed:`, error);
      throw error;
    }
  }
}
