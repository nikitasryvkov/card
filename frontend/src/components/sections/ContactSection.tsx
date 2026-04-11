import { type ReactNode, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    consent: false,
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const subject = encodeURIComponent(`Заявка с сайта от ${form.name}`);
    const body = encodeURIComponent(
      [
        `Имя: ${form.name}`,
        `Телефон: ${form.phone || "не указан"}`,
        `Email: ${form.email}`,
        `Формат сотрудничества: ${form.service || "не указан"}`,
        "",
        "Описание задачи:",
        form.message,
      ].join("\n"),
    );

    window.location.href = `${businessInfo.contacts.emailHref}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Контакты</p>
          <h2 className="mt-4 text-4xl font-display">Обсудим сайт, интерфейс или внутренний сервис для вашего бизнеса</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-steel">
            Для быстрого старта можно отправить краткое описание задачи. После отправки откроется почтовое приложение, а письмо уже будет заполнено.
          </p>

          <div className="mt-8 space-y-4">
            <InfoCard label="Телефон" value={businessInfo.contacts.phone} href={businessInfo.contacts.phoneHref} />
            <InfoCard label="Email" value={businessInfo.contacts.email} href={businessInfo.contacts.emailHref} />
            <InfoCard label="Формат работы" value="Удаленно по всей России" />
          </div>

          <div className="mt-8 rounded-[28px] bg-sand p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-steel">Юридическая информация</p>
            <div className="mt-4 space-y-2 text-sm text-ink">
              <div>{businessInfo.shortName}</div>
              <div>ИНН {businessInfo.inn}</div>
              <div>ОГРНИП {businessInfo.ogrnip}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white" to="/requisites">
                Полные реквизиты
              </Link>
              <Link className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink" to="/privacy">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Заявка</p>
          <h3 className="mt-4 text-3xl font-display">Кратко опишите задачу</h3>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Имя">
              <input
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              />
            </Field>
            <Field label="Телефон">
              <input
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              />
            </Field>
            <Field label="Формат сотрудничества">
              <input
                placeholder="Сайт, дизайн, CRM, кабинет клиента"
                value={form.service}
                onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
                className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
              />
            </Field>
          </div>

          <Field className="mt-5" label="Описание задачи">
            <textarea
              required
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              rows={6}
              className="w-full rounded-2xl border border-black/10 bg-sand px-4 py-3 outline-none transition focus:border-ink"
            />
          </Field>

          <label className="mt-6 flex items-start gap-3 rounded-2xl bg-sand px-4 py-4 text-sm text-steel">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
              required
              className="mt-1 h-4 w-4 rounded border-black/20"
            />
            <span>
              Я соглашаюсь на обработку персональных данных в соответствии с{" "}
              <Link className="font-semibold text-ink underline" to="/privacy">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-panel">
              Отправить заявку
            </button>
            <a
              href={businessInfo.contacts.phoneHref}
              className="rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold text-ink hover:border-ink/20"
            >
              Позвонить
            </a>
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
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="text-xs uppercase tracking-[0.25em] text-steel">{label}</div>
      <div className="mt-2 text-base font-semibold text-ink">{value}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="block rounded-[28px] bg-sand p-5 transition hover:bg-[#efe6da]">
        {content}
      </a>
    );
  }

  return <div className="rounded-[28px] bg-sand p-5">{content}</div>;
}
