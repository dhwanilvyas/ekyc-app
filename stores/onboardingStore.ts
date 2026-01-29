import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProfileDraft = {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
};

export type DocumentDraft = {
  documentType: string;
  documentNumber: string;
};

export type SelfieDraft = {
  hasSelfie: boolean;
};

export type AddressDraft = {
  addressLine1: string;
  city: string;
  country: string;
};

export type ConsentsDraft = {
  termsAccepted: boolean;
};

export type OnboardingDraft = {
  profile: ProfileDraft;
  document: DocumentDraft;
  selfie: SelfieDraft;
  address: AddressDraft;
  consents: ConsentsDraft;
};

export type OnboardingStore = {
  draft: OnboardingDraft;
  currentStep: number;
  isValid: boolean;
  inProgress: boolean;

  updateProfile: (patch: ProfileDraft) => void;
  updateDocument: (patch: DocumentDraft) => void;
  updateSelfie: (patch: SelfieDraft) => void;
  updateAddress: (patch: AddressDraft) => void;
  updateConsents: (patch: ConsentsDraft) => void;

  nextStep: () => void;
  prevStep: () => void;
  resetDraft: () => void;
};

const initialDraft = {
  profile: {
    fullName: '',
    nationality: '',
    dateOfBirth: ''
  },
  document: {
    documentNumber: '',
    documentType: ''
  },
  selfie: {
    hasSelfie: false,
  },
  address: {
    addressLine1: '',
    city: '',
    country: ''
  },
  consents: {
    termsAccepted: false
  },
}

export const useOnboardingStore = create(
  persist<OnboardingStore>(
    (set) => ({
      draft: initialDraft,
      currentStep: 0,
      isValid: false,
      inProgress: false,
      updateProfile: (patch) => {
        set((state) => {
          return {
            ...state,
            inProgress: true,
            draft: {
              ...state.draft,
              profile: patch,
            }
          };
        });
      },
      updateDocument: (patch) => {
        set((state) => {
          return {
            ...state,
            inProgress: true,
            draft: {
              ...state.draft,
              document: patch
            }
          };
        });
      },
      updateSelfie: (patch) => {
        set((state) => {
          return {
            ...state,
            inProgress: true,
            draft: {
              ...state.draft,
              selfie: patch
            }
          };
        });
      },
      updateAddress: (patch) => {
        set((state) => {
          return {
            ...state,
            inProgress: true,
            draft: {
              ...state.draft,
              address: patch
            }
          };
        });
      },
      updateConsents: (patch) => {
        set((state) => {
          return {
            ...state,
            inProgress: true,
            draft: {
              ...state.draft,
              consents: patch
            }
          };
        });
      },

      nextStep: () => {
        set((state) => {
          return {
            ...state,
            currentStep: state.currentStep + 1,
            isValid: getIsValid(state.draft),
            inProgress: true,
          }
        })
      },

      prevStep: () => {
        set((state) => {
          return {
            ...state,
            currentStep: state.currentStep - 1,
            isValid: getIsValid(state.draft),
            inProgress: true,
          }
        })
      },

      resetDraft: () => {
        set((state) => {
          return {
            ...state,
            currentStep: 0,
            draft: initialDraft,
            isValid: false,
            inProgress: false,
          }
        })
      },
    }),
    {
      name: "onboarding-store",
      storage: createJSONStorage(() => ({
        setItem: (key: string, value: string) =>
          AsyncStorage.setItem(key, value),
        getItem: (key: string) => AsyncStorage.getItem(key),
        removeItem: (key: string) => AsyncStorage.removeItem(key),
      })),
    },
  ),
);

const getIsValid = (draft: OnboardingDraft) => {
  return Boolean(draft?.profile?.fullName && draft?.profile?.dateOfBirth && draft?.profile?.nationality && draft?.document?.documentNumber && draft?.document?.documentType && draft?.selfie?.hasSelfie && draft?.address?.addressLine1 && draft?.address?.city && draft?.address?.country)
}