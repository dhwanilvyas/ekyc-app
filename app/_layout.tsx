import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { apiMe, makeRequest } from "@/api";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useThemeStore();
  const { status, setUser } = useAuthStore();
  const [error, setError] = useState();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await makeRequest(apiMe);
        console.log('res', response);
        setUser(response);
        SplashScreen.hideAsync();
      } catch (err: any) {
        setError(err);
        SplashScreen.hideAsync();
        Toast.show({
          type: 'error',
          text1: err.message,
        })
      }
    }

    if (status === 'logged_in') {
      getUserData();
    } else if (status) {
      SplashScreen.hideAsync();
    }
  }, [status]);

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        {error ? <ThemedText>Something went wrong</ThemedText> : (
          <Stack>
            <Stack.Protected guard={status === 'logged_in'}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ title: 'Onboarding' }} />
            </Stack.Protected>
            <Stack.Protected guard={status !== 'logged_in'}>
              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        )}
        <StatusBar style="auto" />
      </SafeAreaProvider>

      <Toast />
    </ThemeProvider>
  );
}
