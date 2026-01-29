import { Colors } from "@/constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeStore = {
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  setSystemTheme: (theme: ColorSchemeName) => void;
  _hasHydrated: boolean;
  setHydrated: () => void;
  isSystem: boolean;
  setIsSystem: (isSystem: boolean) => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: Appearance.getColorScheme(),
      isSystem: true,
      _hasHydrated: false,
      setTheme: (theme) => {
        set((state) => {
          return {
            ...state,
            theme,
            isSystem: false,
          };
        });
      },
      setSystemTheme: (theme) => {
        set((state) => {
          return {
            ...state,
            theme: state.isSystem ? theme : state.theme,
          };
        });
      },
      setIsSystem: (isSystem) => {
        set((state) => {
          return {
            ...state,
            isSystem,
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
          if (state?.isSystem && state.theme !== Appearance.getColorScheme()) {
            state.setSystemTheme(Appearance.getColorScheme());
          }
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
  let color;
  if (!theme) {
    color = colorScheme;
  } else {
    color = theme;
  }

  if (color) {
    const colorFromProps = props[color];

    if (colorFromProps) {
      return colorFromProps;
    } else {
      return Colors[color][colorName];
    }
  }
}
