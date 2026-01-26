import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaProvider>
      <ThemedView style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

        <ThemedText type="title">Login</ThemedText>
      </ThemedView>
    </SafeAreaProvider>
  );
}
