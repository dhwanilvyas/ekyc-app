import { ThemedView } from "@/components/ui/themed-view";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Image } from "react-native";
import { Divider } from "../ui/divider";
import { ThemedButton } from "../ui/themed-button";
import { ThemedText } from "../ui/themed-text";

export default function Review() {
    const { draft, updateConsents } = useOnboardingStore();


    return (
        <ThemedView style={{
            flex: 1,
            gap: 20,
        }}>

            <ThemedText type="subtitle">Profile</ThemedText>
            <ThemedText>Name: {draft.profile.fullName}</ThemedText>
            <ThemedText>Date of birth: {draft.profile.dateOfBirth}</ThemedText>
            <ThemedText>Nationality: {draft.profile.nationality}</ThemedText>
            <Divider />

            <ThemedText type="subtitle">Document</ThemedText>
            <ThemedText>Document type: {draft.document.documentType}</ThemedText>
            <ThemedText>Document number: {draft.document.documentNumber}</ThemedText>
            <Divider />

            <ThemedText type="subtitle">Selfie</ThemedText>
            <Image source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" }} height={60} width={60} />
            <Divider />

            <ThemedText type="subtitle">Address</ThemedText>
            <ThemedText>Address: {draft.address.addressLine1}</ThemedText>
            <ThemedText>City: {draft.address.city}</ThemedText>
            <ThemedText>Country: {draft.address.country}</ThemedText>

            <ThemedButton title={draft?.consents.termsAccepted ? "Terms accepted" : "Accept terms"} onPress={() => updateConsents({
                termsAccepted: true
            })} />
        </ThemedView>
    );
}
