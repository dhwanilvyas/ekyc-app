import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const isLoggedIn = false;

export default function RootLayout() {
  const { theme } = useThemeStore();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ title: 'Onboarding' }} />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
      <Toast />
    </ThemeProvider>
  );
}
