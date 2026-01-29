import { useThemeColor } from "@/stores/themeStore";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export type ThemedSelect = {
    selectedValue: string;
    onValueChange: (val: string) => void;
    options: string[];
    label?: string;
};

export function ThemedSelect({ selectedValue, onValueChange, options, label }: ThemedSelect) {
    const textColor = useThemeColor(
        {},
        "text",
    );
    const pickerIconColor = useThemeColor({}, "pickerIconButtonColor");
    const borderColor = useThemeColor({}, "border");

    return (
        <ThemedView>
            {label && <ThemedText>{label}</ThemedText>}
            <ThemedView style={{ ...styles.default, borderColor }}>
                <Picker
                    mode="dropdown"
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={{ color: textColor }}
                    dropdownIconColor={pickerIconColor}
                >
                    {
                        ['Select option', ...options].map(option => (
                            <Picker.Item key={option} enabled={option !== 'Select option'} label={option} value={option} />
                        ))
                    }

                </Picker>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    default: {
        width: "100%",
        fontSize: 16,
        lineHeight: 24,
        borderWidth: 1,
        borderRadius: 8,
        color: 'red',
        borderColor: 'red'
    },
});
