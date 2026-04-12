import { type ReactNode, FormEvent, startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readApiError } from "../api/errors";
import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import { useLogin, useSession } from "../modules/auth/auth-hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!session) {
      return;
    }

    startTransition(() => {
      navigate(session.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
    });
  }, [navigate, session]);

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/", { replace: true });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    try {
      const response = await login.mutateAsync({ email: email.trim().toLowerCase(), password });
      startTransition(() => {
        navigate(response.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
      });
    } catch (error) {
      const apiError = readApiError(error);
      setFormError(
        apiError?.status === 429
          ? "Слишком много попыток входа. Подождите немного и попробуйте снова."
          : apiError?.message || "Не удалось выполнить вход. Проверьте email, пароль и повторите попытку чуть позже.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto flex max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[36px] border border-white/10 bg-[#0d1d2b] p-8 text-white shadow-panel">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Назад
            </button>

            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-aqua">Безопасный вход</p>
            <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-4xl">
              Доступ к личному кабинету клиента и рабочим зонам проекта.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Здесь открывается доступ к статусам проекта, документам, обращениям в поддержку и другим
              материалам, связанным с вашей работой по проекту.
            </p>
          </section>

          <form
            aria-busy={login.isPending}
            onSubmit={handleSubmit}
            className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur"
          >
            <h2 className="text-3xl font-display text-white">Вход</h2>
            <p className="mt-3 text-sm leading-7 text-mist/75">
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
                  className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none ring-0 transition placeholder:text-white/35 focus:border-aqua/50"
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
                  className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none ring-0 transition placeholder:text-white/35 focus:border-aqua/50"
                  required
                  disabled={login.isPending}
                />
              </Field>
            </div>

            {formError ? (
              <p role="alert" className="mt-4 rounded-2xl bg-ember/10 px-4 py-3 text-sm text-ember">
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-60"
              disabled={login.isPending}
            >
              {login.isPending ? "Входим..." : "Продолжить"}
            </button>

            <p className="mt-6 text-sm leading-7 text-mist/75">
              Нет аккаунта?{" "}
              <Link to="/register" className="font-semibold text-white underline underline-offset-4">
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
    </label>
  );
}
