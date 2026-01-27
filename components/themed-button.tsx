import {
  StyleSheet,
  View,
  Button,
  useColorScheme,
  type ViewProps,
} from "react-native";
import { useMemo, useCallback } from "react";

import { Colors } from "@/constants/theme";

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
  const scheme = useColorScheme() ?? "light";

  const buttonColor = useMemo(() => {
    const colorKey =
      variant === "primary"
        ? disabled
          ? "buttonPrimaryDisabled"
          : "buttonPrimary"
        : disabled
          ? "buttonSecondaryDisabled"
          : "buttonSecondary";

    const colorFromCustom = scheme === "light" ? lightColor : darkColor;
    if (colorFromCustom) {
      return colorFromCustom;
    }

    return Colors[scheme][colorKey as keyof typeof Colors.light];
  }, [scheme, disabled, variant, lightColor, darkColor]);

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
