import { ThemedText } from "@/components/themed-text";
import { Text, View } from "react-native";
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';

export default function Onboarding() {
    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps>
                <ProgressStep label="First Step">
                    <View style={{ alignItems: 'center' }}>
                        <ThemedText>This is the content within step 1!</ThemedText>
                    </View>
                </ProgressStep>
                <ProgressStep label="Second Step">
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 2!</Text>
                    </View>
                </ProgressStep>
                <ProgressStep label="Third Step">
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 3!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
}
