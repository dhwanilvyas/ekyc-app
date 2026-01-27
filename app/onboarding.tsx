import Adress from "@/components/onboarding/Address";
import Document from "@/components/onboarding/Document";
import Profile from "@/components/onboarding/Profile";
import Review from "@/components/onboarding/Review";
import Selfie from "@/components/onboarding/Selfie";
import { ThemedView } from "@/components/ui/themed-view";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useState } from "react";
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';

export default function Onboarding() {
    const { draft, currentStep, nextStep, prevStep, resetDraft } = useOnboardingStore();
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async () => {}

    return (
        <ThemedView style={{ flex: 1 }}>
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
