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
};

export function ThemedButton({
  title,
  onPress,
  disabled = false,
  lightColor,
  darkColor,
  fullWidth = false,
  style,
  ...rest
}: ThemedButtonProps) {
  const buttonColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
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

