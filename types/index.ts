export type SubmissionForm = {
    profile: {
        fullName: string;
        dateOfBirth: string;
        nationality: string;
    },
    document: {
        documentType: string;
        documentNumber: string;
    },
    selfie: {
        hasSelfie: boolean;
    },
    address: {
        addressLine1: string;,
        city: string;
        country: string;
    },
    consents: {
        termsAccepted: boolean;
    }
}

export type User = {
    name: string;
    email: string;
};

export type Session = {
    token: string;
    refreshToken: string;
    expiresAt: string;
};

export type LoginResponse = {
    user: User | null;
    session: Session | null;
};

export type UserState = {
    isLoggedIn: boolean;
    user?: User | null;
    session?: Session | null;
    login: (response: LoginResponse) => void;
    logout: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
}
