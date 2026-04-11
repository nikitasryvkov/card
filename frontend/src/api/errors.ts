import axios from "axios";
import type { ApiErrorResponse } from "../types/api";

export function readApiError(error: unknown): ApiErrorResponse | null {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return null;
  }

  return error.response?.data ?? null;
}

export function readApiErrorMessage(error: unknown, fallback: string) {
  const apiError = readApiError(error);
  return apiError?.message || fallback;
}
