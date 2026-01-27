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
    <View
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        typeof style !== "function" ? style : undefined,
      ]}
      {...rest}
    >
      <Button
        title={displayTitle}
        onPress={handlePress}
        disabled={isDisabled}
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
