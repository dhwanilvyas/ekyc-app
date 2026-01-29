import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/stores/themeStore";

export type DividerProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function Divider({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: DividerProps) {
    const border = useThemeColor(
        { light: lightColor, dark: darkColor },
        "border",
    );

    return <View style={[{ borderBottomWidth: 1, borderBottomColor: border }, style]} {...otherProps} />;
}
