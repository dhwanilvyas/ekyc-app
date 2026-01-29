import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedTextInput } from "@/components/ui/themed-text-input";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailValidationError, setEmailValidationError] = useState('');
  const [password, setPassword] = useState('');
  const { status, login } = useAuthStore();

  const handleEmailChange = (text: string) => {
    setEmailValidationError('');
    setEmail(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const onLogin = async () => {
    const regex = new RegExp("^[^@]+@[^@]+\.[^@]+$");
    if (!regex.test(email)) {
      setEmailValidationError('Incorrect email');
      return;
    }

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
    <ThemedView safeArea>
      <ThemedView style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 20,
      }}>
        <ThemedText type="title" style={{ textAlign: 'center' }}>EKYC app</ThemedText>
        <ThemedText type="subtitle">Login</ThemedText>
        <ThemedTextInput placeholder="Email" onChangeText={handleEmailChange} error={emailValidationError} />
        <ThemedTextInput placeholder="Password" secureTextEntry onChangeText={handlePasswordChange} />
        <ThemedButton title="Login" disabled={!email || !password} isLoading={status === 'logging_in'} fullWidth onPress={onLogin} />
      </ThemedView>
    </ThemedView>
  );
}
