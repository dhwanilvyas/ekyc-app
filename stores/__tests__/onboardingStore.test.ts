import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingStore } from '../onboardingStore';
import type { ProfileDraft } from '../onboardingStore';

/**
 * Test Suite: Onboarding Store - Draft Updates and Step Progression
 * 
 * Milestone 1 Requirement:
 * ✅ test_onboardingDraft_updates_and_progresses_steps
 * 
 * What this tests:
 * - Draft data is correctly updated when user fills form sections
 * - Step counter increments and decrements properly
 * - Step progression validates draft data
 * - Multiple field updates work independently
 * 
 * Interview Talking Points:
 * - This test ensures the core onboarding workflow is reliable
 * - We test both individual updates and step navigation
 * - The store combines business logic (step management) with data persistence
 */

describe('OnboardingStore - Draft Updates and Step Progression', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useOnboardingStore());
    act(() => {
      result.current.resetDraft();
    });
  });

  describe('Profile Draft Updates', () => {
    test('should update profile draft with user information', () => {
      const { result } = renderHook(() => useOnboardingStore());

      const profileData: ProfileDraft = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-15',
        nationality: 'USA',
      };

      act(() => {
        result.current.updateProfile(profileData);
      });

      expect(result.current.draft.profile).toEqual(profileData);
      expect(result.current.draft.profile.fullName).toBe('John Doe');
      expect(result.current.draft.profile.dateOfBirth).toBe('1990-01-15');
    });

    test('should set inProgress flag when profile is updated', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.updateProfile({
          fullName: 'Jane Doe',
          dateOfBirth: '1992-05-20',
          nationality: 'Canada',
        });
      });

      expect(result.current.inProgress).toBe(true);
    });

    test('should preserve other draft sections when updating profile', () => {
      const { result } = renderHook(() => useOnboardingStore());

      const documentData = {
        documentType: 'Passport',
        documentNumber: 'ABC123456',
      };

      const profileData: ProfileDraft = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-15',
        nationality: 'USA',
      };

      act(() => {
        result.current.updateDocument(documentData);
        result.current.updateProfile(profileData);
      });

      expect(result.current.draft.document).toEqual(documentData);
      expect(result.current.draft.profile).toEqual(profileData);
    });
  });

  describe('Document Draft Updates', () => {
    test('should update document draft with document information', () => {
      const { result } = renderHook(() => useOnboardingStore());

      const documentData = {
        documentType: 'Passport',
        documentNumber: 'ABC123456',
      };

      act(() => {
        result.current.updateDocument(documentData);
      });

      expect(result.current.draft.document).toEqual(documentData);
    });
  });

  describe('Address Draft Updates', () => {
    test('should update address draft with address information', () => {
      const { result } = renderHook(() => useOnboardingStore());

      const addressData = {
        addressLine1: '123 Main St',
        city: 'New York',
        country: 'USA',
      };

      act(() => {
        result.current.updateAddress(addressData);
      });

      expect(result.current.draft.address).toEqual(addressData);
    });
  });

  describe('Selfie Draft Updates', () => {
    test('should update selfie draft with selfie status', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.updateSelfie({ hasSelfie: true });
      });

      expect(result.current.draft.selfie.hasSelfie).toBe(true);
    });
  });

  describe('Consents Draft Updates', () => {
    test('should update consents draft with terms acceptance', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.updateConsents({ termsAccepted: true });
      });

      expect(result.current.draft.consents.termsAccepted).toBe(true);
    });
  });

  describe('Step Progression', () => {
    test('should increment current step when nextStep is called', () => {
      const { result } = renderHook(() => useOnboardingStore());

      expect(result.current.currentStep).toBe(0);

      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(1);

      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(2);
    });

    test('should decrement current step when prevStep is called', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.nextStep();
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(2);

      act(() => {
        result.current.prevStep();
      });

      expect(result.current.currentStep).toBe(1);
    });

    test('should set inProgress when step changes', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.nextStep();
      });

      expect(result.current.inProgress).toBe(true);
    });

    test('should validate draft when progressing steps', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Initially, draft is empty, so isValid should be false
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.isValid).toBe(false);

      // Fill in all required fields
      act(() => {
        result.current.updateProfile({
          fullName: 'John Doe',
          dateOfBirth: '1990-01-15',
          nationality: 'USA',
        });
        result.current.updateDocument({
          documentType: 'Passport',
          documentNumber: 'ABC123456',
        });
        result.current.updateSelfie({ hasSelfie: true });
        result.current.updateAddress({
          addressLine1: '123 Main St',
          city: 'New York',
          country: 'USA',
        });
        result.current.updateConsents({ termsAccepted: true });
        result.current.nextStep();
      });

      // After filling all fields and progressing, isValid should be true
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('Complete Onboarding Flow', () => {
    test('should handle complete onboarding workflow with all steps', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Step 0: Profile
      act(() => {
        result.current.updateProfile({
          fullName: 'John Doe',
          dateOfBirth: '1990-01-15',
          nationality: 'USA',
        });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(1);
      expect(result.current.draft.profile.fullName).toBe('John Doe');

      // Step 1: Document
      act(() => {
        result.current.updateDocument({
          documentType: 'Passport',
          documentNumber: 'ABC123456',
        });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(2);
      expect(result.current.draft.document.documentType).toBe('Passport');

      // Step 2: Selfie
      act(() => {
        result.current.updateSelfie({ hasSelfie: true });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(3);
      expect(result.current.draft.selfie.hasSelfie).toBe(true);

      // Step 3: Address
      act(() => {
        result.current.updateAddress({
          addressLine1: '123 Main St',
          city: 'New York',
          country: 'USA',
        });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(4);

      // Step 4: Consents
      act(() => {
        result.current.updateConsents({ termsAccepted: true });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(5);
      expect(result.current.isValid).toBe(true);
    });

    test('should allow going back and updating previous steps', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Progress to step 2
      act(() => {
        result.current.updateProfile({
          fullName: 'John Doe',
          dateOfBirth: '1990-01-15',
          nationality: 'USA',
        });
        result.current.nextStep();
        result.current.updateDocument({
          documentType: 'Passport',
          documentNumber: 'ABC123456',
        });
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(2);

      // Go back to step 1 and update document
      act(() => {
        result.current.prevStep();
      });

      expect(result.current.currentStep).toBe(1);

      act(() => {
        result.current.updateDocument({
          documentType: 'Driver License',
          documentNumber: 'XYZ789012',
        });
      });

      expect(result.current.draft.document.documentType).toBe('Driver License');
    });
  });

  describe('Reset Draft', () => {
    test('should reset all draft data and step to initial state', () => {
      const { result } = renderHook(() => useOnboardingStore());

      // Fill in some data
      act(() => {
        result.current.updateProfile({
          fullName: 'John Doe',
          dateOfBirth: '1990-01-15',
          nationality: 'USA',
        });
        result.current.nextStep();
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(2);
      expect(result.current.draft.profile.fullName).toBe('John Doe');

      // Reset
      act(() => {
        result.current.resetDraft();
      });

      expect(result.current.currentStep).toBe(0);
      expect(result.current.draft.profile.fullName).toBe('');
      expect(result.current.isValid).toBe(false);
      expect(result.current.inProgress).toBe(false);
    });
  });
});
