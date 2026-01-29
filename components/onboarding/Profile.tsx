import { ThemedView } from "@/components/ui/themed-view";
import { ProfileDraft, useOnboardingStore } from "@/stores/onboardingStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ThemedTextInput } from "../ui/themed-text-input";

export default function Profile() {
  const { draft, updateProfile } = useOnboardingStore();

  const [formState, setFormState] = useState<ProfileDraft>({
    fullName: draft.profile.fullName,
    nationality: draft.profile.nationality,
    dateOfBirth: draft.profile.dateOfBirth,
  });

  useEffect(() => {
    updateProfile(formState);
  }, [formState]);

  const handleFormStateChange = (
    fieldName: keyof ProfileDraft,
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 20,
      }}
    >
      <ThemedTextInput
        placeholder="Full name"
        value={formState.fullName}
        onChangeText={(val) => handleFormStateChange("fullName", val)}
      />
      <ThemedTextInput
        placeholder="Nationality"
        value={formState.nationality}
        onChangeText={(val) => handleFormStateChange("nationality", val)}
      />
      <Picker
        selectedValue={formState.nationality}
        onValueChange={(itemValue) =>
          handleFormStateChange("nationality", itemValue)
        }
      >
        <Picker.Item label="Nationality 1" value="Nationality 1" />
        <Picker.Item label="Nationality 2" value="Nationality 2" />
        <Picker.Item label="Nationality 3" value="Nationality 3" />
      </Picker>
      <ThemedTextInput
        placeholder="Date of birth"
        keyboardType="number-pad"
        value={formState.dateOfBirth}
        onChangeText={(val) => handleFormStateChange("dateOfBirth", val)}
      />
      <DateTimePicker
        value={new Date(formState.dateOfBirth)}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            handleFormStateChange("dateOfBirth", selectedDate.toISOString());
          }
        }}
      />
    </ThemedView>
  );
}
