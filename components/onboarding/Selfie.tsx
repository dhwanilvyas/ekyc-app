import { ThemedView } from "@/components/ui/themed-view";
import { SelfieDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { Image } from "react-native";
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
        <ThemedView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            gap: 20,
        }}>
            {draft?.selfie?.hasSelfie && <Image source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" }} height={120} width={100} />}
            <ThemedButton title={draft?.selfie?.hasSelfie ? "Selfie caputred" : "Capture selfie"} onPress={() => handleFormStateChange('hasSelfie', true)} />
        </ThemedView>
    );
}
