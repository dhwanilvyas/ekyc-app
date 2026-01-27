import { apiSubmit, makeRequest } from "@/api";
import Adress from "@/components/onboarding/Address";
import Document from "@/components/onboarding/Document";
import Profile from "@/components/onboarding/Profile";
import Review from "@/components/onboarding/Review";
import Selfie from "@/components/onboarding/Selfie";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { router } from "expo-router";
import { useState } from "react";
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import Toast from "react-native-toast-message";

export default function Onboarding() {
    const { draft, currentStep, nextStep, prevStep, resetDraft } = useOnboardingStore();
    const [isSubmitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);

    const onSubmit = async () => {
        setSubmitting(true);

        try {
            const response = await makeRequest(apiSubmit, draft);
            Toast.show({
                type: 'success',
                text1: 'Success!'
            })
            resetDraft();
            router.navigate('/(tabs)/home');
        } catch (err: any) {
            if (err.fieldErrors) {
                setValidationErrors(err.fieldErrors);
            }
            Toast.show({
                type: 'error',
                text1: err.message
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            {validationErrors && (
                <ThemedView style={{ padding: 5 }}>
                    {Object.keys(validationErrors).map(key => (
                        <ThemedText style={{ color: 'red' }}>- {key}: {validationErrors[key]}</ThemedText>
                    ))}
                </ThemedView>
            )}
            <ProgressSteps activeStep={currentStep}>
                <ProgressStep label="Profile" onNext={nextStep}>
                    <Profile />
                </ProgressStep>
                <ProgressStep label="Document" onNext={nextStep} onPrevious={prevStep}>
                    <Document />
                </ProgressStep>
                <ProgressStep label="Selfie" onNext={nextStep} onPrevious={prevStep}>
                    <Selfie />
                </ProgressStep>
                <ProgressStep label="Adress" onNext={nextStep} onPrevious={prevStep}>
                    <Adress />
                </ProgressStep>
                <ProgressStep label="Submit" onPrevious={prevStep} onSubmit={onSubmit} buttonFinishDisabled={isSubmitting}>
                    <Review />
                </ProgressStep>
            </ProgressSteps>
        </ThemedView>
    );
}
