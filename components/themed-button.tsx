import {
  StyleSheet,
  Pressable,
  Text,
  type PressableProps,
} from "react-native";

import { useThemeColor } from "@/stores/themeStore";

export type ThemedButtonProps = PressableProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline";
};

export function ThemedButton({
  title,
  style,
  lightColor,
  darkColor,
  lightTextColor,
  darkTextColor,
  fullWidth = false,
  variant = "primary",
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
  );
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "background",
  );
  const borderColor = useThemeColor({}, "tint");

  const variantStyles = {
    primary: {
      backgroundColor,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: useThemeColor({}, "background"),
      borderWidth: 2,
      borderColor,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor,
    },
  };

  return (
    <Pressable
      style={[
        styles.button,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        typeof style !== "function" ? style : undefined,
      ]}
      {...rest}
    >
      <Text style={[{ color: textColor }, styles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
