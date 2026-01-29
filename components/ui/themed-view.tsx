import { View, type ViewProps } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { useThemeColor } from "@/stores/themeStore";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeArea,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  if (safeArea) {
    return <KeyboardAvoidingView behavior='padding' style={[{ flex: 1, backgroundColor }, style]} {...otherProps} />;
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
