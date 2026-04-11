import axios from "axios";
import http from "./http";
import type { AuthResponse, CsrfTokenResponse, LoginPayload, RegisterPayload } from "../types/auth";

export async function ensureCsrfToken() {
  await http.get<CsrfTokenResponse>("/v1/auth/csrf");
}

export async function login(payload: LoginPayload) {
  await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/register", payload);
  return data;
}

export async function logout() {
  await ensureCsrfToken();
  await http.post("/v1/auth/logout");
}

export async function getSession() {
  try {
    const { data } = await http.get<AuthResponse>("/v1/auth/me");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}
