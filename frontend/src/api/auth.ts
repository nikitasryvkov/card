import axios from "axios";
import http from "./http";
import type { AuthResponse, CsrfTokenResponse, LoginPayload, RegisterPayload } from "../types/auth";

export async function ensureCsrfToken() {
  const { data } = await http.get<CsrfTokenResponse>("/v1/auth/csrf");
  return data;
}

export async function login(payload: LoginPayload) {
  const csrf = await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/login", payload, {
    headers: {
      "X-XSRF-TOKEN": csrf.token,
    },
  });
  return data;
}

export async function register(payload: RegisterPayload) {
  const csrf = await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/register", payload, {
    headers: {
      "X-XSRF-TOKEN": csrf.token,
    },
  });
  return data;
}

export async function logout() {
  const csrf = await ensureCsrfToken();
  await http.post("/v1/auth/logout", undefined, {
    headers: {
      "X-XSRF-TOKEN": csrf.token,
    },
  });
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
