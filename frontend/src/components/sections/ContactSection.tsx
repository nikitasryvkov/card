import { type ReactNode, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

const collaborationFormats = [
  "MVP и запуск нового продукта",
  "Рефакторинг и архитектурное усиление",
  "Личный кабинет / CRM / админ-панель",
  "Дизайн и UX-перепаковка сервиса",
];

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
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Контакты</p>
          <h2 className="mt-4 text-4xl font-display text-white">Обсудим задачу, архитектуру и реалистичный план запуска</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-mist/75">
            На первом касании достаточно короткого описания задачи. Дальше можно быстро перейти к созвону, разбору
            задачи или предварительной смете под ваш формат проекта.
          </p>

          <div className="mt-8 space-y-4">
            <InfoCard label="Телефон" value={businessInfo.contacts.phone} href={businessInfo.contacts.phoneHref} />
            <InfoCard label="Email" value={businessInfo.contacts.email} href={businessInfo.contacts.emailHref} />
            <InfoCard label="Формат работы" value="Удаленно по всей России, с возможностью ведения проекта под ключ" />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[#102435] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Прозрачность процесса</p>
            <div className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Статусы задач и этапов проекта</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Документы и закрывающие материалы</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">История обращений в поддержку</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">Единый контур взаимодействия с клиентом</div>
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
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[36px] border border-white/10 bg-[#0d1d2b] p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Заявка</p>
          <h3 className="mt-4 text-3xl font-display text-white">Кратко опишите задачу</h3>
          <p className="mt-3 text-sm leading-7 text-mist/70">
            Если проект еще на этапе идеи, это тоже окей. Можно написать бизнес-задачу, а техническую декомпозицию
            сделаем уже на консультации.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {collaborationFormats.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setForm((current) => ({ ...current, service: item }))}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  form.service === item
                    ? "border-aqua/60 bg-aqua/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Имя">
              <input
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>
            <Field label="Телефон">
              <input
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>
            <Field label="Формат сотрудничества">
              <input
                placeholder="Например: MVP, аудит архитектуры, личный кабинет"
                value={form.service}
                onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
              />
            </Field>
          </div>

          <Field className="mt-5" label="Описание задачи">
            <textarea
              required
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-aqua/50"
            />
          </Field>

          <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-mist/75">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
              required
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
            />
            <span>
              Я соглашаюсь на обработку персональных данных в соответствии с{" "}
              <Link className="font-semibold text-white underline underline-offset-4" to="/privacy">
                политикой конфиденциальности
              </Link>
              .
            </span>
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist">
              Отправить заявку
            </button>
            <a
              href={businessInfo.contacts.phoneHref}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
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
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="text-xs uppercase tracking-[0.25em] text-aqua/80">{label}</div>
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
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
