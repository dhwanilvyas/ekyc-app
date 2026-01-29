import { apiSubmit, makeRequest } from "@/api";
import Adress from "@/components/onboarding/Address";
import Document from "@/components/onboarding/Document";
import Profile from "@/components/onboarding/Profile";
import Review from "@/components/onboarding/Review";
import Selfie from "@/components/onboarding/Selfie";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useThemeColor } from "@/stores/themeStore";
import { router } from "expo-router";
import { useState } from "react";
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import Toast from "react-native-toast-message";

export default function Onboarding() {
    const { draft, currentStep, nextStep, prevStep, resetDraft, isValid } = useOnboardingStore();
    const [isSubmitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null);
    const stepperActiveLabelColor = useThemeColor({}, "stepperActiveLabelColor");
    const stepperActiveStepNumColor = useThemeColor({}, "stepperActiveStepNumColor");
    const stepperActiveStepIconBorderColor = useThemeColor({}, "stepperActiveStepIconBorderColor");
    const stepperDisabledStepNumColor = useThemeColor({}, "stepperDisabledStepNumColor");
    const stepperDisabledStepIconColor = useThemeColor({}, "stepperDisabledStepIconColor");
    const stepperCompletedLabelColor = useThemeColor({}, "stepperCompletedLabelColor");
    const stepperButtonPreviousTextColor = useThemeColor({}, "stepperButtonPreviousTextColor");
    const stepperButtonDisabledColor = useThemeColor({}, "stepperButtonDisabledColor");
    
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

    const onPrevious = () => {
        setValidationErrors(null);
        prevStep();
    }

    const onNext = () => {
        setValidationErrors(null);
        nextStep();
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            {validationErrors && (
                <ThemedView style={{ padding: 20, backgroundColor: 'maroon' }}>
                    {Object.keys(validationErrors).map(key => (
                        <ThemedText key={key}>- {key}: {validationErrors[key]}</ThemedText>
                    ))}
                </ThemedView>
            )}
            <ProgressSteps activeStep={currentStep} topOffset={20} activeLabelColor={stepperActiveLabelColor} activeStepNumColor={stepperActiveStepNumColor} activeStepIconBorderColor={stepperActiveStepIconBorderColor} disabledStepNumColor={stepperDisabledStepNumColor} disabledStepIconColor={stepperDisabledStepIconColor} completedLabelColor={stepperCompletedLabelColor}>
                <ProgressStep label="Profile" onNext={onNext}>
                    <Profile />
                </ProgressStep>
                <ProgressStep label="Document" onNext={onNext} onPrevious={onPrevious} buttonPreviousTextColor={stepperButtonPreviousTextColor}>
                    <Document />
                </ProgressStep>
                <ProgressStep label="Selfie" onNext={onNext} onPrevious={onPrevious} buttonPreviousTextColor={stepperButtonPreviousTextColor}>
                    <Selfie />
                </ProgressStep>
                <ProgressStep label="Adress" onNext={onNext} onPrevious={onPrevious} buttonPreviousTextColor={stepperButtonPreviousTextColor}>
                    <Adress />
                </ProgressStep>
                <ProgressStep label="Submit" onPrevious={onPrevious} onSubmit={onSubmit} buttonFinishDisabled={isSubmitting || !isValid} buttonPreviousTextColor={stepperButtonPreviousTextColor} buttonDisabledColor={stepperButtonDisabledColor}>
                    <Review />
                </ProgressStep>
            </ProgressSteps>
        </ThemedView>
    );
}
