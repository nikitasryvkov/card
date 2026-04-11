import http from "./http";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

export async function login(payload: LoginPayload) {
  const { data } = await http.post<AuthResponse>("/v1/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await http.post<AuthResponse>("/v1/auth/register", payload);
  return data;
}
