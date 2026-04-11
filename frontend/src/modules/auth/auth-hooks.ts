import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register } from "../../api/auth";
import { persistSession, getStoredSession } from "./auth-storage";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => getStoredSession(),
    initialData: getStoredSession,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: persistSession,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: persistSession,
  });
}
