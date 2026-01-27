import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const onLogin = async () => {}

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
        <ThemedButton title="Login" disabled={!email || !password} fullWidth onPress={onLogin} />
      </ThemedView>
    </SafeAreaProvider>
  );
}
