import type { AuthResponse, StoredSession } from "../../types/auth";

const SESSION_KEY = "agency.session";

export function persistSession(payload: AuthResponse) {
  const session: StoredSession = {
    token: payload.token,
    user: {
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
    },
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getStoredSession(): StoredSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as StoredSession) : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
