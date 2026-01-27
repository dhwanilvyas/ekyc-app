export type ApiError = {
  status: 400 | 401 | 500;
  message: string;
  fieldErrors?: Record<string, string>;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let currentSession = {
  accessToken: "access_abc",
  refreshToken: "refresh_def",
  expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 mins
};

const user = {
  id: "USR-001",
  email: "jane.doe@example.com",
  fullName: "Jane Doe",
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
    expiresAt: new Date(Date.now() + 60 * 1000).toISOString(), // 1 min
  };

  return {
    user,
    session: currentSession,
  };
}

export async function apiRefresh(refreshToken: string) {
  await delay(500);

  if (refreshToken !== currentSession.refreshToken) {
    throw {
      status: 401,
      message: "Invalid refresh token",
    } as ApiError;
  }

  currentSession = {
    ...currentSession,
    accessToken: "access_" + Date.now(),
    expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
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

  if (!draft.profile?.fullName) {
    fieldErrors["profile.fullName"] = "Required";
  }

  if (!draft.document?.documentNumber) {
    fieldErrors["document.documentNumber"] = "Required";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw {
      status: 400,
      message: "Validation failed",
      fieldErrors,
    } as ApiError;
  }

  return {
    submissionId: "SUB-" + Date.now(),
    status: "RECEIVED",
  };
}

type AuthedRequest<T> = () => Promise<T>;

export async function makeRequest<T>(fn: AuthedRequest<T>): Promise<T> {
  return fn();
}
