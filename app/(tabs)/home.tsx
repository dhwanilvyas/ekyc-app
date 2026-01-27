import { apiMe, makeRequest } from "@/api";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";

export default function Home() {
  const { user } = useAuthStore();

  const getUser = async () => {
    const response = await makeRequest(apiMe);
    console.log(response);
  }
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText type="subtitle">Hi, {user?.fullName}</ThemedText>
      <ThemedButton title="Get profile" onPress={getUser} />
      {user?.isOnboardingDone && <ThemedText>Onboarding done!</ThemedText>}
      {!user?.isOnboardingDone && <ThemedButton title="Start onboarding" onPress={() => router.navigate("/onboarding")} />}
    </ThemedView>
  );
}
