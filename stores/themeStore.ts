import { Colors } from "@/constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

export type ThemeStore = {
  theme: ThemeMode | null;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  _hasHydrated: boolean;
  setHydrated: () => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: null,
      _hasHydrated: false,
      setTheme: (theme) => {
        set((state) => {
          return {
            ...state,
            theme
          };
        });
      },
      toggleTheme: () => {
        set((state) => {
          return {
            ...state,
            theme: state.theme === 'light' ? 'dark' : 'light'
          };
        });
      },
      setHydrated: () => {
        set((state) => {
          return {
            ...state,
           _hasHydrated: true
          };
        });
      }
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => ({
            setItem: (key: string, value: string) =>
              AsyncStorage.setItem(key, value),
            getItem: (key: string) => AsyncStorage.getItem(key),
            removeItem: (key: string) => AsyncStorage.removeItem(key),
          })),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated();
        };
      },
    },
  ),
);

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const { theme } = useThemeStore();
  const colorScheme = useColorScheme();
  const color = theme ?? colorScheme ?? 'light';
  const colorFromProps = props[color];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[color][colorName];
  }
}
