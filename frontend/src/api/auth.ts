import axios from "axios";
import http from "./http";
import type { AuthResponse, CsrfTokenResponse, LoginPayload, RegisterPayload } from "../types/auth";

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${name}=`;
  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(prefix.length));
}

export async function ensureCsrfToken() {
  const { data } = await http.get<CsrfTokenResponse>("/v1/auth/csrf");
  const cookieToken = readCookie("XSRF-TOKEN");
  return cookieToken ?? data.token ?? null;
}

export async function login(payload: LoginPayload) {
  const csrfToken = await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/login", payload, {
    headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : undefined,
  });
  return data;
}

export async function register(payload: RegisterPayload) {
  const csrfToken = await ensureCsrfToken();
  const { data } = await http.post<AuthResponse>("/v1/auth/register", payload, {
    headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : undefined,
  });
  return data;
}

export async function logout() {
  const csrfToken = await ensureCsrfToken();
  await http.post("/v1/auth/logout", undefined, {
    headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : undefined,
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
