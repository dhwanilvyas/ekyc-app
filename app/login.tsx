import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, login } = useAuthStore();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const onLogin = async () => {
    try {
      await login(email, password);
      router.navigate('/(tabs)/home');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err.message
      })
    }
  }

  return (
    <SafeAreaProvider>
      <ThemedView style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 20,
      }}>

        <ThemedText type="subtitle">Login</ThemedText>
        <TextInput placeholder="Email" onChangeText={handleEmailChange} />
        <TextInput placeholder="Password" onChangeText={handlePasswordChange} />
        <ThemedButton title="Login" disabled={!email || !password} isLoading={status === 'logging_in'} fullWidth onPress={onLogin} />
      </ThemedView>
    </SafeAreaProvider>
  );
}
