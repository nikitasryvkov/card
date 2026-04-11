import { type ReactNode, FormEvent, startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister, useSession } from "../modules/auth/auth-hooks";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const register = useRegister();
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!session) {
      return;
    }

    startTransition(() => {
      navigate(session.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
    });
  }, [navigate, session]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await register.mutateAsync(form);
    startTransition(() => {
      navigate(response.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
        <p className="text-xs uppercase tracking-[0.35em] text-ember">Регистрация</p>
        <h1 className="mt-4 text-4xl font-display">Создайте защищенный клиентский кабинет.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-steel">
          При регистрации создается аккаунт `ROLE_USER`, пароль сохраняется в виде BCrypt-хеша, а для входа в защищенный кабинет выдается JWT.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="Имя и фамилия">
            <input
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              required
            />
          </Field>
          <Field label="Компания">
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
          <Field label="Пароль">
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
            Не удалось завершить регистрацию. Проверьте данные и повторите попытку чуть позже.
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel disabled:opacity-60"
          disabled={register.isPending}
        >
          {register.isPending ? "Создаем аккаунт..." : "Создать аккаунт"}
        </button>

        <p className="mt-6 text-sm leading-7 text-steel">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="font-semibold text-ink underline underline-offset-4">
            Войти
          </Link>
        </p>
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
