import { ThemedView } from "@/components/ui/themed-view";
import { AddressDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { ThemedTextInput } from "../ui/themed-text-input";

export default function Adress() {
    const { draft, updateAddress } = useOnboardingStore();

    const [formState, setFormState] = useState<AddressDraft>({
        addressLine1: draft.address.addressLine1,
        city: draft.address.city,
        country: draft.address.country
    });

    useEffect(() => {
        updateAddress(formState)
    }, [formState])

    const handleFormStateChange = (fieldName: keyof AddressDraft, value: string) => {
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

            <ThemedTextInput placeholder="Line 1" value={formState.addressLine1} onChangeText={(val) => handleFormStateChange('addressLine1', val)} />
            <ThemedTextInput placeholder="City" value={formState.city} onChangeText={(val) => handleFormStateChange('city', val)} />
            <ThemedTextInput placeholder="Country" value={formState.country} onChangeText={(val) => handleFormStateChange('country', val)} />
        </ThemedView>
    );
}
