import { type ReactNode, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../modules/auth/auth-hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await login.mutateAsync({ email, password });
    navigate(response.role === "ROLE_ADMIN" ? "/admin" : "/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] bg-ink p-8 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Secure Access</p>
          <h1 className="mt-4 text-4xl font-display text-white">Client dashboard and internal operations under one sign-in layer.</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            JWT-based auth, role-aware routing, and Spring Security-backed endpoint protection are already wired into the scaffold.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <h2 className="text-3xl font-display">Sign in</h2>
          <p className="mt-3 text-sm leading-7 text-steel">Use a registered user account or an admin account provisioned in your environment.</p>

          <div className="mt-8 space-y-5">
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none ring-0 transition focus:border-ink"
                required
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none ring-0 transition focus:border-ink"
                required
              />
            </Field>
          </div>

          {login.isError ? (
            <p className="mt-4 rounded-2xl bg-ember/10 px-4 py-3 text-sm text-ember">
              Authentication failed. Check credentials and backend availability.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel disabled:opacity-60"
            disabled={login.isPending}
          >
            {login.isPending ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
