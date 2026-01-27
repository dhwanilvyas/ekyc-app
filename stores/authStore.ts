import { apiLogin } from "@/api";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthStatus =
  | "logged_out"
  | "logging_in"
  | "logged_in"
  | "refreshing"
  | "expired";

export type User = {
  id: string;
  email: string;
  fullName: string;
  isOnboardingDone?: boolean;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO
};

export type AuthStore = {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  _hasHydrated: boolean;

  login: (email: string, password: string) => Promise<void>;
  setUser: (user: User) => void;
  logout: () => void;

  refreshSession: (session: Session) => void;
  setStatus: (status: AuthStatus) => void;
  setHydrated: () => void;
};


export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      status: 'logged_out',
      user: null,
      session: null,
      _hasHydrated: false,
      login: async (email, password) => {
        set((state) => {
          return {
            ...state,
            status: 'logging_in'
          };
        });

        try {
          const response = await apiLogin(email, password);

          set((state) => {
            return {
              ...state,
              status: response?.user && response?.session ? 'logged_in' : 'logged_out',
              user: response.user ?? null,
              session: response.session ?? null,
            }
          })
        } catch (err) {
          set((state) => {
            return {
              ...state,
              status: 'logged_out',
              user: null,
              session: null,
            }
          })
          throw err;
        }
      },
      setUser: (user) => {
        set((state) => {
          return {
            ...state,
            user,
          };
        });
      },
      logout: () => {
        set((state) => {
          return {
            ...state,
            status: 'logged_out',
            user: null,
            session: null,
          };
        });
      },
      refreshSession: (session) => {
        set((state) => {
          return {
            ...state,
            session
          };
        });
      },
      setStatus: (status) => {
        set((state) => {
          return {
            ...state,
            status
          };
        });
      },
      setHydrated: () => {
        set((state) => {
          return {
            ...state,
            _hasHydrated: true,
          };
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem: (key: string, value: string) =>
          SecureStore.setItemAsync(key, value),
        getItem: (key: string) => SecureStore.getItemAsync(key),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
      })),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated();
        };
      },
    },
  ),
);