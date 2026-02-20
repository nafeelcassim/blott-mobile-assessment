import { STORAGE_KEYS } from "@/constants";
import {
  AsyncStorageService,
  SecureStorageService,
} from "@/services/storage-service";
import { create } from "zustand";

export type AuthProfile = {
  fullName: string;
  email: string;
};

export type RegisterPayload = AuthProfile & {
  password: string;
};

type AuthState = {
  isAuthenticated: boolean;
  isHydrated: boolean;
  profile: AuthProfile | null;
  faceIdEnabled: boolean;
  faceIdSetupCompleted: boolean;

  hydrate: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  setPin: (pin: string) => Promise<void>;
  setFaceIdEnabled: (enabled: boolean) => Promise<void>;
  completeFaceIdSetup: () => Promise<void>;
  loginWithPin: (pin: string) => Promise<boolean>;
  loginWithFaceId: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isHydrated: false,
  profile: null,
  faceIdEnabled: false,
  faceIdSetupCompleted: false,

  hydrate: async () => {
    try {
      const [fullName, email, pin, faceIdEnabled, faceIdSetupCompleted] =
        await Promise.all([
          AsyncStorageService.get<string>(STORAGE_KEYS.fullName),
          AsyncStorageService.get<string>(STORAGE_KEYS.email),
          SecureStorageService.get<string>(STORAGE_KEYS.pin),
          AsyncStorageService.get<boolean>(STORAGE_KEYS.faceIdEnabled),
          AsyncStorageService.get<boolean>(STORAGE_KEYS.faceIdSetupCompleted),
        ]);

      const profile = fullName && email ? { fullName, email } : null;

      set({
        profile,
        isAuthenticated: Boolean(pin),
        faceIdEnabled: Boolean(faceIdEnabled),
        faceIdSetupCompleted: Boolean(faceIdSetupCompleted),
        isHydrated: true,
      });
    } catch {
      set({ isHydrated: true });
    }
  },

  register: async ({ fullName, email, password }) => {
    await Promise.all([
      AsyncStorageService.set(STORAGE_KEYS.fullName, fullName),
      AsyncStorageService.set(STORAGE_KEYS.email, email),
      SecureStorageService.set(STORAGE_KEYS.password, password),
    ]);

    set({ profile: { fullName, email } });
  },

  setPin: async (pin: string) => {
    await SecureStorageService.set(STORAGE_KEYS.pin, pin);
    await AsyncStorageService.set(STORAGE_KEYS.faceIdSetupCompleted, false);
    set({ isAuthenticated: true, faceIdSetupCompleted: false });
  },

  setFaceIdEnabled: async (enabled: boolean) => {
    await Promise.all([
      AsyncStorageService.set(STORAGE_KEYS.faceIdEnabled, enabled),
      AsyncStorageService.set(STORAGE_KEYS.faceIdSetupCompleted, true),
    ]);
    set({ faceIdEnabled: enabled, faceIdSetupCompleted: true });
  },

  completeFaceIdSetup: async () => {
    await AsyncStorageService.set(STORAGE_KEYS.faceIdSetupCompleted, true);
    set({ faceIdSetupCompleted: true });
  },

  loginWithPin: async (pin: string) => {
    const storedPin = await SecureStorageService.get<string>(STORAGE_KEYS.pin);
    const isValid = Boolean(storedPin) && storedPin === pin;

    if (isValid) {
      set({ isAuthenticated: true });
    }

    return isValid;
  },

  loginWithFaceId: async () => {
    set({ isAuthenticated: true });
  },

  logout: async () => {
    await Promise.all([
      SecureStorageService.delete(STORAGE_KEYS.pin),
      SecureStorageService.delete(STORAGE_KEYS.password),
      AsyncStorageService.set(STORAGE_KEYS.faceIdEnabled, false),
      AsyncStorageService.set(STORAGE_KEYS.faceIdSetupCompleted, false),
    ]);

    set({
      isAuthenticated: false,
      faceIdEnabled: false,
      faceIdSetupCompleted: false,
    });
  },
}));
