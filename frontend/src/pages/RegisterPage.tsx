import { type ReactNode, FormEvent, startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readApiError } from "../api/errors";
import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import { useRegister, useSession } from "../modules/auth/auth-hooks";

type RegisterFormState = {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  consent: boolean;
};

type RegisterFieldErrors = Partial<Record<keyof RegisterFormState, string>>;

const initialForm: RegisterFormState = {
  fullName: "",
  companyName: "",
  email: "",
  password: "",
  consent: false,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const register = useRegister();
  const [form, setForm] = useState<RegisterFormState>(initialForm);
  const [errors, setErrors] = useState<RegisterFieldErrors>({});
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

  function validate(nextForm: RegisterFormState) {
    const nextErrors: RegisterFieldErrors = {};

    if (nextForm.fullName.trim().length < 2) {
      nextErrors.fullName = "Укажите имя и фамилию, чтобы можно было создать доступ для клиента.";
    }

    if (!nextForm.email.trim()) {
      nextErrors.email = "Укажите email, который будет использоваться для входа.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextForm.email.trim())) {
      nextErrors.email = "Похоже, email введен в неверном формате.";
    }

    if (nextForm.companyName.trim().length > 160) {
      nextErrors.companyName = "Название компании лучше сократить до 160 символов.";
    }

    if (nextForm.password.length < 8) {
      nextErrors.password = "Пароль должен содержать минимум 8 символов.";
    }

    if (!nextForm.consent) {
      nextErrors.consent = "Для регистрации нужно согласие на обработку персональных данных.";
    }

    return nextErrors;
  }

  function updateField<K extends keyof RegisterFormState>(key: K, value: RegisterFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFormError("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError("Проверьте поля формы: часть данных заполнена не полностью или в неверном формате.");
      return;
    }

    try {
      const response = await register.mutateAsync({
        fullName: form.fullName.trim(),
        companyName: form.companyName.trim() || undefined,
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      startTransition(() => {
        navigate(response.role === "ROLE_ADMIN" ? "/admin" : "/dashboard", { replace: true });
      });
    } catch (error) {
      const apiError = readApiError(error);

      if (apiError?.validationErrors) {
        const validationErrors = apiError.validationErrors;
        setErrors((current) => ({
          ...current,
          fullName: validationErrors.fullName ?? current.fullName,
          companyName: validationErrors.companyName ?? current.companyName,
          email: validationErrors.email ?? current.email,
          password: validationErrors.password ?? current.password,
        }));
      }

      setFormError(
        apiError?.status === 429
          ? "Сейчас слишком много попыток регистрации с вашего IP. Подождите немного и попробуйте снова."
          : apiError?.message || "Не удалось завершить регистрацию. Проверьте данные и повторите попытку чуть позже.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto flex max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <form
          aria-busy={register.isPending}
          onSubmit={handleSubmit}
          className="w-full rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur"
        >
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Назад
          </button>

          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-ember">Регистрация</p>
          <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-4xl">
            Создайте доступ в личный кабинет клиента.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/75">
            После регистрации вы сможете вести работу по проекту в одном месте: отслеживать этапы, получать
            документы и хранить историю взаимодействия без разрозненной переписки.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Имя и фамилия" error={errors.fullName}>
              <input
                autoComplete="name"
                placeholder="Например: Никита Срывков"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-aqua/50"
                required
                disabled={register.isPending}
                aria-invalid={Boolean(errors.fullName)}
              />
            </Field>
            <Field label="Компания" error={errors.companyName}>
              <input
                autoComplete="organization"
                placeholder="Если есть юридическое лицо или бренд"
                value={form.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-aqua/50"
                disabled={register.isPending}
                aria-invalid={Boolean(errors.companyName)}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="name@company.ru"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-aqua/50"
                required
                disabled={register.isPending}
                aria-invalid={Boolean(errors.email)}
              />
            </Field>
            <Field label="Пароль" error={errors.password}>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="Минимум 8 символов"
                aria-describedby="register-password-hint"
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#102435] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-aqua/50"
                minLength={8}
                required
                disabled={register.isPending}
                aria-invalid={Boolean(errors.password)}
              />
              <span id="register-password-hint" className="mt-2 block text-xs leading-6 text-mist/65">
                Лучше использовать пароль длиной от 8 символов с буквами и цифрами.
              </span>
            </Field>
          </div>

          <label className="mt-6 block rounded-2xl border border-white/10 bg-[#102435] px-4 py-4 text-sm text-mist/75">
            <span className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                required
                disabled={register.isPending}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span>
                Я даю согласие на обработку персональных данных и подтверждаю, что ознакомился с{" "}
                <Link to="/privacy" className="font-semibold text-white underline underline-offset-4">
                  политикой конфиденциальности
                </Link>{" "}
                и{" "}
                <Link to="/consent" className="font-semibold text-white underline underline-offset-4">
                  согласием на обработку персональных данных
                </Link>
                .
              </span>
            </span>
            {errors.consent ? <span className="mt-3 block text-sm text-amber-200">{errors.consent}</span> : null}
          </label>

          {formError ? (
            <p role="alert" className="mt-4 rounded-2xl bg-ember/10 px-4 py-3 text-sm text-ember">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-60"
            disabled={register.isPending}
          >
            {register.isPending ? "Создаем аккаунт..." : "Создать аккаунт"}
          </button>

          <p className="mt-4 text-xs leading-6 text-mist/65">
            Создавая аккаунт, вы также подтверждаете ознакомление с{" "}
            <Link to="/offer" className="font-semibold text-white underline underline-offset-4">
              публичной офертой
            </Link>
            .
          </p>

          <p className="mt-6 text-sm leading-7 text-mist/75">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="font-semibold text-white underline underline-offset-4">
              Войти
            </Link>
          </p>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-amber-200">{error}</span> : null}
    </label>
  );
}
