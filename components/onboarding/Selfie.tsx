import { ThemedView } from "@/components/ui/themed-view";
import { SelfieDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedButton } from "../ui/themed-button";

export default function Selfie() {
    const { draft, updateSelfie } = useOnboardingStore();

    const [formState, setFormState] = useState<SelfieDraft>({
        hasSelfie: draft.selfie.hasSelfie
    });

    useEffect(() => {
        updateSelfie(formState)
    }, [formState])

    const handleFormStateChange = (fieldName: keyof SelfieDraft, value: boolean) => {
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

                <ThemedButton title={draft?.selfie?.hasSelfie ? "Selfie caputred" : "Capture selfie"} onPress={() => handleFormStateChange('hasSelfie', true)} />
            </ThemedView>
        </SafeAreaProvider>
    );
}
