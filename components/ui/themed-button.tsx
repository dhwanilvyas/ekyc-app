import {
  StyleSheet,
  Pressable,
  Text,
  useColorScheme,
  type ViewProps,
} from "react-native";
import { useMemo, useCallback } from "react";

import { Colors } from "@/constants/theme";

export type ThemedButtonProps = ViewProps & {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  lightColor?: string;
  darkColor?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
};

export function ThemedButton({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  lightColor,
  darkColor,
  fullWidth = false,
  variant = "primary",
  style,
  ...rest
}: ThemedButtonProps) {
  const scheme = useColorScheme() ?? "light";

  const isDisabled = disabled || isLoading;
  const displayTitle = isLoading ? "Loading..." : title;

  const buttonColor = useMemo(() => {
    const colorKey =
      variant === "primary"
        ? isDisabled
          ? "buttonPrimaryDisabled"
          : "buttonPrimary"
        : isDisabled
          ? "buttonSecondaryDisabled"
          : "buttonSecondary";

    const colorFromCustom = scheme === "light" ? lightColor : darkColor;
    if (colorFromCustom) {
      return colorFromCustom;
    }

    return Colors[scheme][colorKey as keyof typeof Colors.light];
  }, [scheme, isDisabled, variant, lightColor, darkColor]);

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      onPress();
    }
  }, [onPress, isDisabled]);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: buttonColor },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        typeof style !== "function" ? style : undefined,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      {...rest}
    >
      <Text style={[styles.text, isDisabled && styles.disabledText]}>
        {displayTitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.7,
  },
});
