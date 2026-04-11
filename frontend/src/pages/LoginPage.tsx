import { type ReactNode, FormEvent, startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useSession } from "../modules/auth/auth-hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const response = await login.mutateAsync({ email, password });
    startTransition(() => {
      navigate(response.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] bg-ink p-8 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Безопасный вход</p>
          <h1 className="mt-4 text-4xl font-display text-white">Доступ к личному кабинету клиента и внутренним рабочим зонам.</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Здесь открывается доступ к статусам проекта, документам, обращениям в поддержку и другим
            материалам, связанным с вашей работой по проекту.
          </p>
        </div>

        <form aria-busy={login.isPending} onSubmit={handleSubmit} className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <h2 className="text-3xl font-display">Вход</h2>
          <p className="mt-3 text-sm leading-7 text-steel">
            Используйте email, который был указан при регистрации или согласован для доступа в рабочую зону.
          </p>

          <div className="mt-8 space-y-5">
            <Field label="Email">
              <input
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="name@company.ru"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none ring-0 transition focus:border-ink"
                required
                disabled={login.isPending}
              />
            </Field>
            <Field label="Пароль">
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Ваш пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none ring-0 transition focus:border-ink"
                required
                disabled={login.isPending}
              />
            </Field>
          </div>

          {login.isError ? (
            <p role="alert" className="mt-4 rounded-2xl bg-ember/10 px-4 py-3 text-sm text-ember">
              Не удалось выполнить вход. Проверьте email, пароль и повторите попытку чуть позже.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel disabled:opacity-60"
            disabled={login.isPending}
          >
            {login.isPending ? "Входим..." : "Продолжить"}
          </button>

          <p className="mt-6 text-sm leading-7 text-steel">
            Нет аккаунта?{" "}
            <Link to="/register" className="font-semibold text-ink underline underline-offset-4">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </main>
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
