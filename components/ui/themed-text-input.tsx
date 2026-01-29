import {
  StyleSheet,
  TextInput,
  type TextInputProps
} from "react-native";

import { useThemeColor, useThemeStore } from "@/stores/themeStore";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  error?: string | null;
  label?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  error = null,
  label,
  ...rest
}: ThemedTextProps) {
  const { theme } = useThemeStore();
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );
  const placeholderColor = useThemeColor({}, "placeholder");
  const borderColor = useThemeColor({}, "border");

  return (
    <ThemedView>
      {label && <ThemedText>{label}</ThemedText>}
      <TextInput
        style={[styles[type], { color: textColor, borderColor }, style]}
        placeholderTextColor={placeholderColor}
        keyboardAppearance={theme ?? "default"}
        {...rest}
      />
      {error && <ThemedText style={{ color: 'red', display: 'flex' }}>{error}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  defaultSemiBold: {
    width: "100%",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    width: "100%",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  subtitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  link: {
    width: "100%",
    lineHeight: 30,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
