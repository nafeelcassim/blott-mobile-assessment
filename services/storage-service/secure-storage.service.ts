import * as SecureStore from "expo-secure-store";

export type SecureStoreOptions = SecureStore.SecureStoreOptions;

export class SecureStorageService {
  /**
   * expo-secure-store only allows [A-Za-z0-9._-].
   * Replace any other character with "_".
   */
  private static sanitiseKey(key: string): string {
    return key.replace(/[^A-Za-z0-9._\-]/g, "_");
  }

  private static serialise<T>(value: T): string {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  private static deserialise<T>(raw: string): T {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  /**
   * Returns `true` when the device supports SecureStore (always false on web).
   */
  static async isAvailable(): Promise<boolean> {
    return SecureStore.isAvailableAsync();
  }

  /**
   * Securely store a value.
   * Objects/arrays are JSON-serialised automatically.
   *
   * @param options  SecureStore options, e.g. { requireAuthentication: true }
   */
  static async set<T>(
    key: string,
    value: T,
    options?: SecureStoreOptions,
  ): Promise<void> {
    try {
      const safeKey = SecureStorageService.sanitiseKey(key);
      const serialised = SecureStorageService.serialise(value);
      await SecureStore.setItemAsync(safeKey, serialised, options);
    } catch (error) {
      console.error(`[SecureStorageService] set("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Retrieve a securely stored value.
   * Returns `null` when the key does not exist.
   *
   * @param options  SecureStore options, e.g. { requireAuthentication: true }
   */
  static async get<T = string>(
    key: string,
    options?: SecureStoreOptions,
  ): Promise<T | null> {
    try {
      const safeKey = SecureStorageService.sanitiseKey(key);
      const raw = await SecureStore.getItemAsync(safeKey, options);
      if (raw === null) return null;
      return SecureStorageService.deserialise<T>(raw);
    } catch (error) {
      console.error(`[SecureStorageService] get("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Synchronously retrieve a value (uses the SecureStore cache — may be
   * `null` until the async version has been called at least once).
   * Useful inside synchronous contexts such as React render.
   */
  static getSync<T = string>(key: string): T | null {
    try {
      const safeKey = SecureStorageService.sanitiseKey(key);
      const raw = SecureStore.getItem(safeKey);
      if (raw === null) return null;
      return SecureStorageService.deserialise<T>(raw);
    } catch (error) {
      console.error(`[SecureStorageService] getSync("${key}") failed:`, error);
      return null;
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  /**
   * Remove a single key from secure storage.
   */
  static async delete(
    key: string,
    options?: SecureStoreOptions,
  ): Promise<void> {
    try {
      const safeKey = SecureStorageService.sanitiseKey(key);
      await SecureStore.deleteItemAsync(safeKey, options);
    } catch (error) {
      console.error(`[SecureStorageService] delete("${key}") failed:`, error);
      throw error;
    }
  }

  /**
   * Remove multiple keys. SecureStore has no native multi-delete,
   * so this runs deletions in parallel.
   */
  static async deleteMany(
    keys: string[],
    options?: SecureStoreOptions,
  ): Promise<void> {
    try {
      await Promise.all(
        keys.map((key) => SecureStorageService.delete(key, options)),
      );
    } catch (error) {
      console.error(`[SecureStorageService] deleteMany() failed:`, error);
      throw error;
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Returns `true` if the key exists in secure storage.
   */
  static async has(
    key: string,
    options?: SecureStoreOptions,
  ): Promise<boolean> {
    const value = await SecureStorageService.get(key, options);
    return value !== null;
  }

  /**
   * Convenience: update a stored JSON object by merging a partial payload.
   * Does nothing if the key does not exist and `createIfMissing` is false.
   */
  static async merge<T extends object>(
    key: string,
    partial: Partial<T>,
    options?: SecureStoreOptions,
    createIfMissing = true,
  ): Promise<void> {
    const existing = await SecureStorageService.get<T>(key, options);
    if (existing === null && !createIfMissing) return;

    const merged: T =
      existing !== null && typeof existing === "object"
        ? { ...existing, ...partial }
        : (partial as T);

    await SecureStorageService.set<T>(key, merged, options);
  }
}
