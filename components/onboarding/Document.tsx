import { ThemedView } from "@/components/ui/themed-view";
import { DocumentDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { ThemedSelect } from "../ui/themed-select";
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
        <ThemedView style={{
            flex: 1,
            justifyContent: "center",
            gap: 20,
        }}>

            <ThemedSelect label="Document type" selectedValue={formState.documentType} onValueChange={(val) => handleFormStateChange('documentType', val)} options={["Document 1", "Document 2"]} />
            <ThemedTextInput placeholder="Document number" label="Document number" value={formState.documentNumber} onChangeText={(val) => handleFormStateChange('documentNumber', val)} />
        </ThemedView>
    );
}
