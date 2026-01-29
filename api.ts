import { router } from "expo-router";

export type ApiError = {
  status: 400 | 401 | 500;
  message: string;
  fieldErrors?: Record<string, string>;
};

const getExpiryTime = () => new Date(Date.now() + 1 * 10 * 1000).toISOString(); // 10 secs

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let currentSession = {
  accessToken: "access_abc",
  refreshToken: "refresh_def",
  expiresAt: getExpiryTime(),
};

let user = {
  id: "USR-001",
  email: "jane.doe@example.com",
  fullName: "Jane Doe",
  isOnboardingDone: false,
};

const VALID_EMAIL = "jane.doe@example.com";
const VALID_PASSWORD = "password123";

const isExpired = (expiresAt: string) =>
  Date.now() > new Date(expiresAt).getTime();

const maybeFail500 = () => {
  if (Math.random() < 0.1) {
    throw {
      status: 500,
      message: "Server error. Try again.",
    } as ApiError;
  }
};

export async function apiLogin(email: string, password: string) {
  await delay(800);
  maybeFail500();

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    throw {
      status: 401,
      message: "Invalid credentials",
    } as ApiError;
  }

  currentSession = {
    accessToken: "access_" + Date.now(),
    refreshToken: "refresh_" + Date.now(),
    expiresAt: getExpiryTime(),
  };

  return {
    user,
    session: currentSession,
  };
}

export async function apiRefresh(refreshToken: string, retry?: number) {
  await delay(500);

  if (retry === 1) {
    throw {
      status: 401,
      message: "Invalid refresh token",
    } as ApiError;
  }

  if (refreshToken !== currentSession.refreshToken) {
    throw {
      status: 401,
      message: "Invalid refresh token",
    } as ApiError;
  }

  currentSession = {
    ...currentSession,
    accessToken: "access_" + Date.now(),
    expiresAt: getExpiryTime(),
  };

  return currentSession;
}

export async function apiMe(accessToken: string) {
  await delay(500);

  if (accessToken !== currentSession.accessToken) {
    throw { status: 401, message: "Invalid token" } as ApiError;
  }

  if (isExpired(currentSession.expiresAt)) {
    throw { status: 401, message: "Token expired" } as ApiError;
  }

  return user;
}

export async function apiSubmit(accessToken: string, draft: any) {
  await delay(1000);
  maybeFail500();

  if (accessToken !== currentSession.accessToken) {
    throw { status: 401, message: "Invalid token" } as ApiError;
  }

  if (isExpired(currentSession.expiresAt)) {
    throw { status: 401, message: "Token expired" } as ApiError;
  }

  const fieldErrors: Record<string, string> = {};

  if (!draft.consents?.termsAccepted) {
    fieldErrors["consents.termsAccepted"] = "Required";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw {
      status: 400,
      message: "Validation failed",
      fieldErrors,
    } as ApiError;
  }

  user.isOnboardingDone = true;

  return {
    submissionId: "SUB-" + Date.now(),
    status: "RECEIVED",
  };
}

export async function makeRequest(fn: (token: string, params?: any) => void, params?: any): Promise<any> {
  try {
    const response = await fn(currentSession.accessToken, params);
    return response;
  } catch (err: any) {
    if (err.status === 401) {
      try {
        console.log('error 401')
        const session = await apiRefresh(currentSession?.refreshToken);
        const response = await fn(session.accessToken, params);
        console.log('session', response)
        return response;
      } catch (err) {
        router.navigate('/session-expired')
      }
    }

    throw err;
  }
}
