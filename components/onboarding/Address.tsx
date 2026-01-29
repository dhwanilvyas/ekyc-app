import { ThemedView } from "@/components/ui/themed-view";
import { AddressDraft, useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect, useState } from "react";
import { ThemedSelect } from "../ui/themed-select";
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

            <ThemedTextInput label="Line 1" placeholder="Line 1" value={formState.addressLine1} onChangeText={(val) => handleFormStateChange('addressLine1', val)} />
            <ThemedTextInput label="City" placeholder="City" value={formState.city} onChangeText={(val) => handleFormStateChange('city', val)} />
            <ThemedSelect label="Country" selectedValue={formState.country} onValueChange={(val) => handleFormStateChange('country', val)} options={["Country 1", "Country 2"]} />    
        </ThemedView>
    );
}
