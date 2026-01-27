import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";
import { Switch } from "react-native";

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
       <ThemedText type="subtitle">Hi, {user?.fullName}</ThemedText>
       <ThemedView style={{ flexDirection: 'row', alignItems: 'center'}}>
        <ThemedText>{theme}</ThemedText>
        <Switch value={theme === 'light'} onValueChange={toggleTheme} />
       </ThemedView>
       <ThemedButton title="Logout" onPress={logout} />
    </ThemedView>
  );
}
