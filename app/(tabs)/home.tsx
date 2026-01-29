import { apiMe, makeRequest } from "@/api";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { router } from "expo-router";
import { Image } from "react-native";

export default function Home() {
  const { user } = useAuthStore();
  const { inProgress } = useOnboardingStore();

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
        gap: 20,
      }}
    >
      <Image source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" }} height={120} width={100} />
      <ThemedText type="subtitle">Hi, {user?.fullName}</ThemedText>
      <ThemedButton title="Get profile" onPress={getUser} />
      {user?.isOnboardingDone && <ThemedText>Onboarding done!</ThemedText>}
      {!user?.isOnboardingDone && <ThemedButton title={inProgress ? "Continue onboarding" : "Start onboarding"} onPress={() => router.navigate("/onboarding")} />}
    </ThemedView>
  );
}
