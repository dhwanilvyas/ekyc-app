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

  updateProfile: (patch: Partial<ProfileDraft>) => void;
  updateDocument: (patch: Partial<DocumentDraft>) => void;
  updateSelfie: (patch: Partial<SelfieDraft>) => void;
  updateAddress: (patch: Partial<AddressDraft>) => void;
  updateConsents: (patch: Partial<ConsentsDraft>) => void;

  nextStep: () => void;
  prevStep: () => void;
  resetDraft: () => void;
};
