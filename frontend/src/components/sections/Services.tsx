const services = [
  {
    title: "Разработка цифровых продуктов",
    eyebrow: "Разработка",
    description:
      "Проектирую и запускаю устойчивые сервисы, внутренние кабинеты и клиентские продукты с понятной архитектурой и запасом на рост.",
    bullets: ["Аналитика и проектирование MVP", "Java + React fullstack-разработка", "API-first подход и усиление DevOps"],
    accent: "from-ember/20 to-ember/5",
  },
  {
    title: "UX/UI и продуктовый дизайн",
    eyebrow: "Дизайн",
    description:
      "От продающих лендингов до сложных интерфейсов: дизайн строится вокруг пользы, конверсии и удобства для пользователей.",
    bullets: ["Дизайн-системы под бренд", "Лендинги с высокой конверсией", "Доступные кабинеты и рабочие сценарии"],
    accent: "from-aqua/20 to-aqua/5",
  },
  {
    title: "CRM, поддержка и автоматизация",
    eyebrow: "Операции",
    description:
      "Связываю сайт с операционной частью бизнеса: заявками, клиентским кабинетом, отчетностью и автоматизацией процессов.",
    bullets: ["Воронки лидов и тикетинг", "Архитектура клиентского кабинета", "Инвойсы по этапам и статусы проектов"],
    accent: "from-panel/15 to-white/30",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Услуги</p>
          <h2 className="mt-4 text-4xl font-display leading-tight sm:text-5xl">
            Делаю не просто сайт, а цифровую систему, которая помогает бизнесу работать и продавать.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-steel">
            Публичная часть, CRM, кабинет клиента, поддержка и финансовые процессы проектируются как единый продукт, а не как набор разрозненных модулей.
          </p>
        </div>

        <div className="rounded-[32px] border border-black/5 bg-white/70 p-6 shadow-panel backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Средний старт" value="7 дней" />
            <Stat label="Готовность к запуску" value="92%" />
            <Stat label="Продление поддержки" value="84%" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className={`group relative overflow-hidden rounded-[32px] border border-black/5 bg-gradient-to-br ${service.accent} bg-white/80 p-7 shadow-panel transition duration-300 hover:-translate-y-1`}
          >
            <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-white/50 blur-2xl transition duration-300 group-hover:scale-125" />
            <p className="relative text-xs uppercase tracking-[0.35em] text-steel">{service.eyebrow}</p>
            <h3 className="relative mt-4 text-2xl font-display">{service.title}</h3>
            <p className="relative mt-4 text-sm leading-7 text-steel">{service.description}</p>

            <ul className="relative mt-6 space-y-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-ember" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-sand px-4 py-5 text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-steel">{label}</div>
      <div className="mt-3 font-display text-2xl text-ink">{value}</div>
    </div>
  );
}
