import { useThemeColor } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const PLACEHOLDER = "Select option";

export type ThemedSelectProps = {
    selectedValue: string;
    onValueChange: (val: string) => void;
    options: string[];
    label?: string;
};

export function ThemedSelect({
    selectedValue,
    onValueChange,
    options,
    label,
}: ThemedSelectProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const textColor = useThemeColor({}, "text");
    const pickerIconColor = useThemeColor({}, "pickerIconButtonColor");
    const borderColor = useThemeColor({}, "border");
    const backgroundColor = useThemeColor({}, "background");

    const displayOptions = [PLACEHOLDER, ...options];
    const displayValue =
        selectedValue && selectedValue !== PLACEHOLDER
            ? selectedValue
            : PLACEHOLDER;

    const openModal = useCallback(() => setModalVisible(true), []);
    const closeModal = useCallback(() => setModalVisible(false), []);

    const handleSelect = useCallback(
        (value: string) => {
            // Pass empty string when placeholder is selected to match form state
            onValueChange(value === PLACEHOLDER ? "" : value);
            closeModal();
        },
        [onValueChange, closeModal],
    );

    const renderOption = useCallback(
        ({ item }: { item: string }) => {
            const isPlaceholder = item === PLACEHOLDER;
            const isSelected =
                item === selectedValue ||
                (item === PLACEHOLDER && !selectedValue);
            return (
                <TouchableOpacity
                    style={[
                        styles.optionRow,
                        isSelected && { backgroundColor: borderColor },
                    ]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                    disabled={false}
                >
                    <ThemedText
                        style={[
                            styles.optionText,
                            { color: textColor },
                            isPlaceholder && styles.placeholderOption,
                        ]}
                    >
                        {item}
                    </ThemedText>
                    {isSelected && (
                        <View style={styles.checkmarkWrap}>
                            <Ionicons
                                name="checkmark"
                                size={22}
                                color={pickerIconColor}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            );
        },
        [textColor, borderColor, pickerIconColor, selectedValue, handleSelect],
    );

    return (
        <ThemedView>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}
            <Pressable
                style={[styles.trigger, { borderColor }]}
                onPress={openModal}
                accessibilityRole="button"
                accessibilityLabel={`${label ?? "Select"}: ${displayValue}`}
            >
                <ThemedText
                    style={[
                        styles.triggerText,
                        { color: textColor },
                        displayValue === PLACEHOLDER && styles.placeholderText,
                    ]}
                >
                    {displayValue}
                </ThemedText>
                <ThemedText style={[styles.chevron, { color: pickerIconColor }]}>
                    ▼
                </ThemedText>
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={closeModal}
                >
                    <Pressable
                        style={[styles.modalContent, { backgroundColor }]}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <ThemedView style={styles.modalHeader}>
                            <ThemedText style={styles.modalTitle}>
                                {label ?? "Select option"}
                            </ThemedText>
                            <TouchableOpacity
                                onPress={closeModal}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                            >
                                <ThemedText style={[styles.cancelButton, { color: textColor }]}>
                                    Cancel
                                </ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                        <FlatList
                            data={displayOptions}
                            keyExtractor={(item) => item}
                            renderItem={renderOption}
                            style={styles.optionList}
                            keyboardShouldPersistTaps="handled"
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
    },
    trigger: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        minHeight: 48,
    },
    triggerText: {
        fontSize: 16,
        flex: 1,
    },
    placeholderText: {
        opacity: 0.6,
    },
    chevron: {
        fontSize: 12,
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgba(0,0,0,0.1)",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    cancelButton: {
        fontSize: 16,
    },
    optionList: {
        maxHeight: 320,
        paddingVertical: 8,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    checkmarkWrap: {
        marginLeft: 8,
    },
    optionText: {
        fontSize: 16,
    },
    placeholderOption: {
        opacity: 0.6,
    },
});
