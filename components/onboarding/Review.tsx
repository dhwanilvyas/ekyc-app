import { ThemedView } from "@/components/ui/themed-view";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedText } from "../ui/themed-text";

export default function Review() {
    const { draft } = useOnboardingStore();


    return (
        <SafeAreaProvider>
            <ThemedView style={{
                flex: 1,
                justifyContent: "center",
                gap: 20,
            }}>

                <ThemedText type="subtitle">Profile</ThemedText>
                <ThemedText>Name: {draft.profile.fullName}</ThemedText>
                <ThemedText>Date of birth: {draft.profile.dateOfBirth}</ThemedText>
                <ThemedText>Nationality: {draft.profile.nationality}</ThemedText>
                <ThemedView style={{ borderBottomWidth: 1 }} />

                <ThemedText type="subtitle">Document</ThemedText>
                <ThemedText>Document type: {draft.document.documentType}</ThemedText>
                <ThemedText>Document number: {draft.document.documentNumber}</ThemedText>
                <ThemedView style={{ borderBottomWidth: 1 }} />

                <ThemedText type="subtitle">Selfie</ThemedText>
                <Image source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" }} height={100} width={100} />
                <ThemedView style={{ borderBottomWidth: 1 }} />
            </ThemedView>
        </SafeAreaProvider>
    );
}
