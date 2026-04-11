const services = [
  {
    title: "Разработка ПО",
    code: "62.01",
    description:
      "Вы получаете backend на Java и Spring Boot, frontend на React и API, на котором можно запускать MVP, кабинет клиента или внутренний сервис. На выходе: рабочий код, структура базы данных, роли доступа и подготовка к релизу.",
    bullets: ["Рабочий backend, frontend и API под ваш продукт", "Личный кабинет, CRM или MVP с ролевой моделью", "Подготовка к релизу и развитию после первого запуска"],
    accent: "from-ember/20 via-ember/5 to-transparent",
  },
  {
    title: "ИТ-консалтинг",
    code: "62.02.1",
    description:
      "Вы получаете аудит текущей системы, рекомендации по стеку, схему архитектуры и план доработок. Это подходит, если проект уже есть, но тормозит рост, нестабилен или слишком дорог в поддержке.",
    bullets: ["Разбор слабых мест архитектуры и интеграций", "Схема БД, сервисов и контура безопасности", "План работ с приоритетами, рисками и roadmap"],
    accent: "from-aqua/20 via-aqua/5 to-transparent",
  },
  {
    title: "Дизайн",
    code: "74.10",
    description:
      "Вы получаете прототипы экранов, UI-kit и интерфейсы, которые можно сразу передавать в разработку. Дизайн здесь не оторван от продукта: он помогает сократить правки и ускорить запуск.",
    bullets: ["Прототипы ключевых сценариев и логики экранов", "UI-kit и дизайн-система под развитие продукта", "Интерфейсы, которые не расходятся с реализацией"],
    accent: "from-white/20 via-white/5 to-transparent",
  },
];

const serviceBenefits = [
  "Один подрядчик отвечает за архитектуру, код, интерфейсы и запуск, без потери контекста между этапами.",
  "Сайт, кабинет и внутренние процессы проектируются как одна система, а не как набор разрозненных экранов.",
  "Инфраструктура и AI-процессы подключаются тогда, когда они реально снижают издержки и ускоряют рост продукта.",
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Услуги</p>
          <h2 className="mt-4 text-4xl font-display leading-tight text-white sm:text-5xl">
            Три направления, с которых можно собрать MVP, кабинет клиента или внутреннюю систему без разрыва между идеей и релизом.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Здесь важен не сам набор услуг, а результат: понятная архитектура, рабочий код, интерфейс под реальные сценарии и база для дальнейшего роста без переписывания с нуля.
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
