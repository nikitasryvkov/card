import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

const collaborationFormats = [
  "MVP и запуск нового продукта",
  "Рефакторинг и архитектурное усиление",
  "Личный кабинет / CRM / админ-панель",
  "Дизайн и UX-перепаковка сервиса",
] as const;

const nextSteps = [
  "Разберем бизнес-задачу и ограничения по срокам.",
  "Подскажем формат первого релиза: MVP, аудит, кабинет или редизайн.",
  "Согласуем следующий шаг: созвон, смету или техническое уточнение.",
] as const;

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Контакты</p>
          <h2 className="mt-4 text-4xl font-display text-white">
            Обсудим задачу, архитектуру и реалистичный план запуска
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-mist/75">
            Формы на сайте нет: проще и быстрее написать напрямую в удобный канал. В ответ вы получите
            ориентир по срокам, формату запуска и следующий понятный шаг по проекту.
          </p>

          <div className="mt-8 space-y-4">
            <InfoCard label="Телефон" value={businessInfo.contacts.phone} href={businessInfo.contacts.phoneHref} />
            <InfoCard label="Email" value={businessInfo.contacts.email} href={businessInfo.contacts.emailHref} />
            <InfoCard
              label="Telegram"
              value={businessInfo.contacts.telegram}
              href={businessInfo.contacts.telegramHref}
            />
            <InfoCard
              label="Формат работы"
              value="Удаленно по всей России, с возможностью ведения проекта под ключ"
            />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-[#102435] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Как написать, чтобы сэкономить время</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/80">
              <div>Опишите задачу в 2-3 предложениях.</div>
              <div>Если есть сроки, бюджетный ориентир или текущий стек, лучше сразу указать их.</div>
              <div>Если проект только начинается, достаточно коротко описать цель и ожидаемый результат.</div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-aqua/10 via-white/5 to-ember/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">После первого контакта</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/80">
              {nextSteps.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0d1d2b] p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Каналы связи</p>
          <h3 className="mt-4 text-3xl font-display text-white">Выберите удобный способ связаться</h3>
          <p className="mt-3 text-sm leading-7 text-mist/70">
            Для визиточного сайта это надежнее, чем промежуточная форма: сообщение не потеряется, а вам не
            придется ждать, пока сработает сторонний сценарий отправки.
          </p>

          <div className="mt-8 grid gap-4">
            <ActionCard
              href={businessInfo.contacts.telegramHref}
              label="Telegram"
              title="Написать в Telegram"
              description={`Самый быстрый канал для первого контакта: ${businessInfo.contacts.telegram}`}
              tone="primary"
            />
            <ActionCard
              href={businessInfo.contacts.emailHref}
              label="Email"
              title="Написать на email"
              description="Подходит, если нужно сразу приложить описание задачи, документы или реквизиты."
            />
            <ActionCard
              href={businessInfo.contacts.phoneHref}
              label="Телефон"
              title="Позвонить"
              description="Удобно, если вопрос проще проговорить голосом и быстро согласовать следующий шаг."
            />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Чаще всего обращаются по задачам</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {collaborationFormats.map((item) => (
                <span
                  key={item}
                  className="max-w-full whitespace-normal break-words rounded-full border border-white/10 bg-[#102435] px-4 py-2 text-sm text-white/80"
                >
                  {item}
                </span>
              ))}
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
      </div>
    </section>
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
      <a
        href={href}
        className="block rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10"
      >
        {content}
      </a>
    );
  }

  return <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">{content}</div>;
}

function ActionCard({
  href,
  label,
  title,
  description,
  tone = "default",
}: {
  href: string;
  label: string;
  title: string;
  description: string;
  tone?: "default" | "primary";
}) {
  return (
    <a
      href={href}
      className={`block rounded-[28px] border p-5 transition ${
        tone === "primary"
          ? "border-aqua/30 bg-aqua/10 hover:border-aqua/50 hover:bg-aqua/15"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.25em] text-aqua/80">{label}</div>
      <div className="mt-3 text-xl font-display leading-tight text-white">{title}</div>
      <div className="mt-3 text-sm leading-7 text-white/75">{description}</div>
    </a>
  );
}
