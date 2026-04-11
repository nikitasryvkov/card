import { type ReactNode, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../modules/auth/auth-hooks";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await register.mutateAsync(form);
    navigate("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
        <p className="text-xs uppercase tracking-[0.35em] text-ember">Create account</p>
        <h1 className="mt-4 text-4xl font-display">Launch a secure client workspace.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-steel">
          Registration creates a `ROLE_USER` account, stores a BCrypt hash, and returns a JWT for protected dashboard access.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="Full name">
            <input
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              required
            />
          </Field>
          <Field label="Company name">
            <input
              value={form.companyName}
              onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              required
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              minLength={8}
              required
            />
          </Field>
        </div>

        {register.isError ? (
          <p className="mt-4 rounded-2xl bg-ember/10 px-4 py-3 text-sm text-ember">
            Registration failed. Confirm backend connectivity and whether the email is already registered.
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel disabled:opacity-60"
          disabled={register.isPending}
        >
          {register.isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
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
