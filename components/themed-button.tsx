import {
  StyleSheet,
  View,
  Button,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/stores/themeStore";

export type ThemedButtonProps = ViewProps & {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  lightColor?: string;
  darkColor?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
};

export function ThemedButton({
  title,
  onPress,
  disabled = false,
  lightColor,
  darkColor,
  fullWidth = false,
  variant = "primary",
  style,
  ...rest
}: ThemedButtonProps) {
  let colorName: "buttonPrimary" | "buttonPrimaryDisabled" | "buttonSecondary" | "buttonSecondaryDisabled";

  if (variant === "primary") {
    colorName = disabled ? "buttonPrimaryDisabled" : "buttonPrimary";
  } else {
    colorName = disabled ? "buttonSecondaryDisabled" : "buttonSecondary";
  }

  const buttonColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName,
  );

  return (
    <View
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        typeof style !== "function" ? style : undefined,
      ]}
      {...rest}
    >
      <Button
        title={title}
        onPress={onPress}
        disabled={disabled}
        color={buttonColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
  },
});


