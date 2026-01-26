import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Button title="Onboarding" onPress={() => router.navigate("/onboarding")} />
    </View>
  );
}
