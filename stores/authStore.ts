export type AuthStatus =
  | "logged_out"
  | "logging_in"
  | "logged_in"
  | "refreshing"
  | "expired";

export type User = {
  id: string;
  email: string;
  fullName: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO
};

export type AuthStore = {
  status: AuthStatus;
  user: User | null;
  session: Session | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  refreshSession: (session: Session) => void;
  setStatus: (status: AuthStatus) => void;
};
