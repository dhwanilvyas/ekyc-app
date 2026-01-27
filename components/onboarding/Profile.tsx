import { ThemedView } from "@/components/ui/themed-view";
import { ProfileDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedTextInput } from "../ui/themed-text-input";

export default function Profile() {
    const { draft, updateProfile } = useOnboardingStore();

    const [formState, setFormState] = useState<ProfileDraft>({
        fullName: draft.profile.fullName,
        nationality: draft.profile.nationality,
        dateOfBirth: draft.profile.dateOfBirth
    });

    useEffect(() => {
        updateProfile(formState)
    }, [formState])

    const handleFormStateChange = (fieldName: keyof ProfileDraft, value: string) => {
        setFormState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }


    return (
        <SafeAreaProvider>
            <ThemedView style={{
                flex: 1,
                justifyContent: "center",
                gap: 20,
            }}>

                <ThemedTextInput placeholder="Full name" value={formState.fullName} onChangeText={(val) => handleFormStateChange('fullName', val)} />
                <ThemedTextInput placeholder="Nationality" value={formState.nationality} onChangeText={(val) => handleFormStateChange('nationality', val)} />
                <ThemedTextInput placeholder="Date of birth" value={formState.dateOfBirth} onChangeText={(val) => handleFormStateChange('dateOfBirth', val)} />
            </ThemedView>
        </SafeAreaProvider>
    );
}
