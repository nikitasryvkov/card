const services = [
  {
    title: "Разработка ПО",
    code: "62.01",
    description:
      "Создание сложных систем: backend на Java и Spring Boot, frontend на React, проектирование API, микросервисы, личные кабинеты и MVP для стартапов и B2B-проектов.",
    bullets: ["Backend на Java 21 + Spring Boot", "React-интерфейсы и клиентские кабинеты", "MVP, API-интеграции и развитие до production"],
    accent: "from-ember/20 via-ember/5 to-transparent",
  },
  {
    title: "ИТ-консалтинг",
    code: "62.02.1",
    description:
      "Технический аудит, выбор стека, проектирование баз данных и контуров безопасности, подготовка инфраструктуры и оптимизация процессов через автоматизацию.",
    bullets: ["Аудит текущей архитектуры и рисков", "Проектирование БД, сервисов и ролевой модели", "Автоматизация внутренних процессов и подготовка roadmap"],
    accent: "from-aqua/20 via-aqua/5 to-transparent",
  },
  {
    title: "Дизайн",
    code: "74.10",
    description:
      "UX/UI и продуктовый дизайн: прототипы, дизайн-системы и интерфейсы, в которых удобно работать. Эстетика сразу проверяется на техническую реализуемость.",
    bullets: ["Прототипы и пользовательские сценарии", "Дизайн-системы и UI-kit под продукт", "Интерфейсы, где дизайн не конфликтует с разработкой"],
    accent: "from-white/20 via-white/5 to-transparent",
  },
];

const serviceBenefits = [
  "От одного подрядчика вы получаете и код, и архитектуру, и UX/UI.",
  "Сайт, кабинет и административные процессы проектируются как единая система.",
  "AI-возможности и инфраструктура подключаются как развитие продукта, а не как отдельный хаотичный слой.",
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Услуги</p>
          <h2 className="mt-4 text-4xl font-display leading-tight text-white sm:text-5xl">
            Три направления, которые закрывают разработку, архитектуру и дизайн без разрыва между этапами.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Это особенно важно для B2B-продуктов, клиентских кабинетов, внутренних систем и MVP, где слабое место
            обычно появляется не в коде, а на стыке решений.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-3">
            {serviceBenefits.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#102435] px-4 py-5 text-sm leading-7 text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${service.accent} bg-white/5 p-7 shadow-panel backdrop-blur`}
          >
            <div className="absolute -right-6 top-4 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.35em] text-aqua/80">ОКВЭД {service.code}</p>
            <h3 className="relative mt-4 text-2xl font-display text-white">{service.title}</h3>
            <p className="relative mt-4 text-sm leading-7 text-mist/75">{service.description}</p>

            <ul className="relative mt-6 space-y-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-white/80">
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
