import {
  StyleSheet,
  TextInput,
  useColorScheme,
  type TextInputProps,
} from "react-native";

import { useThemeColor } from "@/stores/themeStore";

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const scheme = useColorScheme();
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );
  const placeholderColor = useThemeColor({}, "placeholder");
  const borderColor = useThemeColor({}, "border");

  return (
    <TextInput
      style={[styles[type], { color: textColor, borderColor }, style]}
      placeholderTextColor={placeholderColor}
      keyboardAppearance={scheme ?? "default"}
      {...rest}
    />
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
