export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface AuthResponse {
  email: string;
  fullName: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  fullName: string;
  companyName?: string;
}

export interface CsrfTokenResponse {
  token: string;
}
