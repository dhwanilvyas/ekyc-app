import { Divider } from "@/components/ui/divider";
import { ThemedButton } from "@/components/ui/themed-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { useThemeColor, useThemeStore } from "@/stores/themeStore";
import { Appearance, ColorSchemeName, Image } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtons = [
  {
    id: 'system',
    label: 'System',
    value: 'System'
  },
  {
    id: 'light',
    label: 'Light',
    value: 'Light',
  },
  {
    id: 'dark',
    label: 'Dark',
    value: 'dark'
  }
];

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { theme, setTheme, isSystem, setIsSystem, setSystemTheme } = useThemeStore();
  const color = useThemeColor({}, "text");

  const onThemeSelect = (selectedId: string) => {
    if (selectedId === 'system') {
      setIsSystem(true);
      setSystemTheme(Appearance.getColorScheme());
    } else {
      setTheme(selectedId as ColorSchemeName);
    }
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 80,
        gap: 15,
      }}
    >
      <ThemedView style={{ alignItems: 'center', gap: 20 }}>
        <Image source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" }} height={120} width={100} />
        <ThemedText type="title">Hi, {user?.fullName}</ThemedText>
      </ThemedView>

      <Divider />

      <ThemedText type="subtitle">Theme</ThemedText>
      <RadioGroup
        containerStyle={{
          alignItems: 'flex-start'
        }}
        labelStyle={{
          color
        }}
        radioButtons={radioButtons}
        onPress={onThemeSelect}
        selectedId={isSystem ? 'system' : theme as string}
      />
      <ThemedButton style={{marginTop: 'auto'}} title="Logout" onPress={logout} />
    </ThemedView>
  );
}
