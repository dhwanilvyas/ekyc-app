import { ThemedView } from "@/components/ui/themed-view";
import { DocumentDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedTextInput } from "../ui/themed-text-input";

export default function Document() {
    const { draft, updateDocument } = useOnboardingStore();

    const [formState, setFormState] = useState<DocumentDraft>({
        documentType: draft.document.documentType,
        documentNumber: draft.document.documentNumber,
    });

    useEffect(() => {
        updateDocument(formState)
    }, [formState])

    const handleFormStateChange = (fieldName: keyof DocumentDraft, value: string) => {
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

                <ThemedTextInput placeholder="Document type" value={formState.documentType} onChangeText={(val) => handleFormStateChange('documentType', val)} />
                <ThemedTextInput placeholder="Document number" value={formState.documentNumber} onChangeText={(val) => handleFormStateChange('documentNumber', val)} />
            </ThemedView>
        </SafeAreaProvider>
    );
}
