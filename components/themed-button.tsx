import {
  StyleSheet,
  View,
  Button,
  type ViewProps,
} from "react-native";
import { useMemo, useCallback } from "react";

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
  const colorName = useMemo(() => {
    if (variant === "primary") {
      return disabled ? "buttonPrimaryDisabled" : "buttonPrimary";
    } else {
      return disabled ? "buttonSecondaryDisabled" : "buttonSecondary";
    }
  }, [variant, disabled]);

  const buttonColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName,
  );

  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress();
    }
  }, [onPress, disabled]);

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
        onPress={handlePress}
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

