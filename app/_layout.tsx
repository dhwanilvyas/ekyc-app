import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { apiMe, makeRequest } from "@/api";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import { Alert, Appearance, TouchableOpacity } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme, setSystemTheme, _hasHydrated } = useThemeStore();
  const { status, setUser, logout } = useAuthStore();
  const { resetDraft } = useOnboardingStore();
  const readyToLoad = _hasHydrated;

  Appearance.addChangeListener((preference) => {
    setSystemTheme(preference.colorScheme);
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await makeRequest(apiMe);
        console.log('res', response);
        setUser(response);
      } catch (err: any) {
        Toast.show({
          type: 'error',
          text1: err.message,
        })
        logout();
      } finally {
        if (readyToLoad) {
          SplashScreen.hideAsync();
        }
      }
    }

    if (status === 'logged_in') {
      getUserData();
    } else if (status && readyToLoad) {
      SplashScreen.hideAsync();
    }
  }, [status, readyToLoad]);

  const onResetDraft = () => {
    Alert.alert("Confirm action", "Are you sure you want to reset draft", [{
      text: 'Yes',
      onPress: () => {
        resetDraft();
        router.navigate('/(tabs)/home');
      }
    }], {
      cancelable: true
    })
  }

  const renderResetDraft = () => {
    return (
      <TouchableOpacity onPress={onResetDraft}><ThemedText>Reset draft</ThemedText></TouchableOpacity>
    )
  }

  return (
    <KeyboardProvider>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Protected guard={status === 'logged_in'}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ title: 'Onboarding', headerRight: renderResetDraft }} />
            <Stack.Screen name="session-expired" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={status !== 'logged_in'}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>

        <Toast />
      </ThemeProvider>
    </KeyboardProvider>
  );
}
