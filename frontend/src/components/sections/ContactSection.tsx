import { type ReactNode, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

const collaborationFormats = [
  "MVP и запуск нового продукта",
  "Рефакторинг и архитектурное усиление",
  "Личный кабинет / CRM / админ-панель",
  "Дизайн и UX-перепаковка сервиса",
] as const;

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ tone: "info" | "error"; text: string } | null>(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  function validate(nextForm: ContactFormState) {
    const nextErrors: ContactFormErrors = {};
    const trimmedName = nextForm.name.trim();
    const trimmedPhone = nextForm.phone.trim();
    const trimmedEmail = nextForm.email.trim();
    const trimmedMessage = nextForm.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = "Укажите имя, чтобы можно было обратиться к вам в ответе.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Укажите email для обратной связи.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Похоже, email введен в неверном формате.";
    }

    if (trimmedPhone && trimmedPhone.replace(/[^\d+]/g, "").length < 7) {
      nextErrors.phone = "Если указываете телефон, лучше дать номер, по которому реально можно связаться.";
    }

    if (trimmedMessage.length < 20) {
      nextErrors.message = "Опишите задачу чуть подробнее: хотя бы в одном-двух предложениях.";
    }

    if (!nextForm.consent) {
      nextErrors.consent = "Нужно согласие на обработку персональных данных.";
    }

    return nextErrors;
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(businessInfo.contacts.email);
      setIsEmailCopied(true);
      window.setTimeout(() => setIsEmailCopied(false), 2500);
    } catch {
      setNotice({
        tone: "error",
        text: "Не удалось скопировать email автоматически. Можно написать вручную на адрес ниже.",
      });
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setNotice(null);

    if (Object.keys(nextErrors).length > 0) {
      setNotice({
        tone: "error",
        text: "Проверьте поля формы: нужно заполнить обязательные данные и кратко описать задачу.",
      });
      return;
    }

    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service.trim(),
      message: form.message.trim(),
    };

    const subject = encodeURIComponent(`Заявка с сайта от ${trimmedForm.name}`);
    const body = encodeURIComponent(
      [
        `Имя: ${trimmedForm.name}`,
        `Телефон: ${trimmedForm.phone || "не указан"}`,
        `Email: ${trimmedForm.email}`,
        `Формат сотрудничества: ${trimmedForm.service || "не указан"}`,
        "",
        "Описание задачи:",
        trimmedForm.message,
      ].join("\n"),
    );

    setIsSubmitting(true);
    setNotice({
      tone: "info",
      text: `Сейчас откроется почтовое приложение. Если оно не настроено, напишите напрямую на ${businessInfo.contacts.email}.`,
    });

    window.location.href = `${businessInfo.contacts.emailHref}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  }

  function updateField<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Контакты</p>
          <h2 className="mt-4 text-4xl font-display text-white">Обсудим задачу, архитектуру и реалистичный план запуска</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-mist/75">
            Достаточно описать задачу в двух-трех предложениях. В ответ вы получите вариант решения, ориентир по срокам и понятный следующий шаг по запуску проекта.
          </p>

          <div className="mt-8 space-y-4">
            <InfoCard label="Телефон" value={businessInfo.contacts.phone} href={businessInfo.contacts.phoneHref} />
            <InfoCard label="Email" value={businessInfo.contacts.email} href={businessInfo.contacts.emailHref} />
            <InfoCard label="Формат работы" value="Удаленно по всей России, с возможностью ведения проекта под ключ" />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[#102435] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Прозрачность процесса</p>
            <div className="mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Статусы задач и этапов проекта</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Документы и закрывающие материалы</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">История обращений в поддержку</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Единый контур взаимодействия с клиентом</div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-aqua/10 via-white/5 to-ember/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">После первого контакта</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/80">
              <div>Разберем бизнес-задачу и ограничения по срокам.</div>
              <div>Подскажем формат первого релиза: MVP, кабинет, аудит или дизайн-перепаковка.</div>
              <div>Согласуем удобный следующий шаг: созвон, смету или техническое уточнение.</div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Юридическая информация</p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <div>{businessInfo.shortName}</div>
              <div>ИНН {businessInfo.inn}</div>
              <div>ОГРНИП {businessInfo.ogrnip}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink" to="/requisites">
                Полные реквизиты
              </Link>
              <Link className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white" to="/privacy">
                Политика конфиденциальности
              </Link>
              <Link className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white" to="/consent">
                Согласие на обработку ПД
              </Link>
            </div>
          </div>
        </div>

        <form
          noValidate
          aria-busy={isSubmitting}
          onSubmit={handleSubmit}
          className="rounded-[36px] border border-white/10 bg-[#0d1d2b] p-8 shadow-panel"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Заявка</p>
          <h3 className="mt-4 text-3xl font-display text-white">Кратко опишите задачу</h3>
          <p className="mt-3 text-sm leading-7 text-mist/70">
            Если проект еще на этапе идеи, этого достаточно. Можно описать бизнес-задачу, а техническую декомпозицию и состав первого релиза разберем уже на созвоне.
          </p>

          {notice ? (
            <p
              role={notice.tone === "error" ? "alert" : "status"}
              className={`mt-6 rounded-2xl px-4 py-3 text-sm leading-7 ${
                notice.tone === "error" ? "bg-ember/10 text-ember" : "bg-aqua/10 text-white/85"
              }`}
            >
              {notice.text}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {collaborationFormats.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={form.service === item}
                onClick={() => updateField("service", item)}
                className={`max-w-full whitespace-normal break-words rounded-full border px-4 py-2 text-left text-sm transition ${
                  form.service === item
                    ? "border-aqua/60 bg-aqua/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Имя" error={errors.name}>
              <input
                id="contact-name"
                required
                autoComplete="name"
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>

            <Field label="Телефон" error={errors.phone}>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                spellCheck={false}
                placeholder="name@company.ru"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>

            <Field label="Формат сотрудничества">
              <input
                id="contact-service"
                placeholder="Например: MVP, аудит архитектуры, личный кабинет"
                value={form.service}
                onChange={(event) => updateField("service", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>
          </div>

          <Field className="mt-5" label="Описание задачи" error={errors.message}>
            <textarea
              id="contact-message"
              required
              rows={6}
              placeholder="Что нужно сделать, для кого продукт и какой результат вам нужен на первом релизе"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
            />
          </Field>

          <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-mist/75">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              required
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
            />
            <span>
              Я даю согласие на обработку персональных данных и подтверждаю, что ознакомился с{" "}
              <Link className="font-semibold text-white underline underline-offset-4" to="/privacy">
                политикой конфиденциальности
              </Link>
              {" "}и{" "}
              <Link className="font-semibold text-white underline underline-offset-4" to="/consent">
                согласием на обработку персональных данных
              </Link>
              .
            </span>
          </label>
          {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Готовим письмо..." : "Получить разбор задачи"}
            </button>
            <a
              href={businessInfo.contacts.phoneHref}
              className="w-full rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
            >
              Позвонить
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
            >
              {isEmailCopied ? "Email скопирован" : "Скопировать email"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
  error,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
    </label>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return (
    <span role="alert" className="mt-2 block text-sm text-amber-200">
      {children}
    </span>
  );
}

function InfoCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="text-xs uppercase tracking-[0.25em] text-aqua/80">{label}</div>
      <div className="mt-2 break-words text-base font-semibold text-white">{value}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="block rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10">
        {content}
      </a>
    );
  }

  return <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">{content}</div>;
}
