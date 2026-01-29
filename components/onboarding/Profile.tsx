import { ThemedView } from "@/components/ui/themed-view";
import { ProfileDraft, useOnboardingStore } from "@/stores/onboardingStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ThemedSelect } from "../ui/themed-select";
import { ThemedTextInput } from "../ui/themed-text-input";

export default function Profile() {
    const [showDatePicker, setShowPicker] = useState(false);
    const { draft, updateProfile } = useOnboardingStore();

    const [formState, setFormState] = useState<ProfileDraft>({
        fullName: draft.profile.fullName,
        nationality: draft.profile.nationality,
        dateOfBirth: draft.profile.dateOfBirth,
    });

    useEffect(() => {
        updateProfile(formState);
    }, [formState]);

    const handleFormStateChange = (
        fieldName: keyof ProfileDraft,
        value: string,
    ) => {
        setFormState((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const openDatePicker = () => {
        setShowPicker(true);
    }

    return (
        <ThemedView
            style={{
                flex: 1,
                justifyContent: "center",
                gap: 20,
            }}
        >
            <ThemedTextInput
                label="Full name"
                value={formState.fullName}
                onChangeText={(val) => handleFormStateChange("fullName", val)}
            />
            <ThemedSelect label="Nationality" selectedValue={formState.nationality} onValueChange={(val) => handleFormStateChange('nationality', val)} options={["Nationality 1", "Nationality 2"]} />
            <TouchableOpacity onPress={openDatePicker}>
                <ThemedTextInput
                    label="Date of birth"
                    keyboardType="number-pad"
                    value={formState.dateOfBirth ? new Date(formState.dateOfBirth).toLocaleDateString() : new Date().toLocaleDateString()}
                    readOnly
                />
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={formState.dateOfBirth ? new Date(formState.dateOfBirth) : new Date()}
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            handleFormStateChange("dateOfBirth", selectedDate.toISOString());
                        }
                        if (event.type === "set" || event.type === "dismissed") {
                            setShowPicker(false);
                        }
                    }}

                />
            )}
        </ThemedView>
    );
}
