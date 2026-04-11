const stackGroups = [
  {
    title: "Backend",
    description: "Java 21 и Spring Boot подходят для систем с ролями, бизнес-логикой, интеграциями и предсказуемой поддержкой после релиза.",
    technologies: ["Java 21", "Spring Boot", "Hibernate", "PostgreSQL"],
  },
  {
    title: "Frontend",
    description: "React и TypeScript дают быстрые, понятные и поддерживаемые интерфейсы для клиентов, менеджеров и внутренних команд.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
  },
  {
    title: "Infrastructure",
    description: "Docker, Nginx и CI/CD нужны не для галочки, а чтобы релизы были предсказуемыми, а обновления не превращались в ручной стресс.",
    technologies: ["Docker", "Proxmox", "Nginx", "CI/CD"],
  },
  {
    title: "Tools",
    description: "Документация API, управление задачами и эксплуатационные инструменты помогают держать проект прозрачным для команды и заказчика.",
    technologies: ["Swagger / OpenAPI", "Jira", "Trello", "Actuator + Logback"],
  },
];

export default function TechStackSection() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Технологический стек</p>
          <h2 className="mt-4 text-4xl font-display text-white sm:text-5xl">
            Стек здесь нужен не для витрины, а чтобы первый релиз не пришлось переделывать при росте.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Архитектура, интерфейс, API и инфраструктура собираются как единый контур. За счет этого проще считать сроки, безопаснее выпускать обновления и дешевле развивать продукт после MVP.
          </p>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f2435]/80 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-200">Преимущество для бизнеса</div>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Вы получаете стек, на котором можно спокойно жить после запуска: без ручных релизов, без бесконечных технических компромиссов и без необходимости переписывать половину системы при росте нагрузки или команды.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {stackGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-aqua/90">{group.title}</p>
              <h3 className="mt-4 text-2xl font-display text-white">{group.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist/75">{group.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-[#102435] px-3 py-1.5 text-xs font-semibold text-white/80"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
