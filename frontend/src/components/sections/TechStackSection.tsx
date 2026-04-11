const stackGroups = [
  {
    title: "Backend",
    description: "Надежный серверный слой для бизнес-логики, интеграций и защищенного API.",
    technologies: ["Java 21", "Spring Boot", "Hibernate", "PostgreSQL"],
  },
  {
    title: "Frontend",
    description: "Интерфейсы, которые быстро работают, легко развиваются и понятны пользователю.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
  },
  {
    title: "Infrastructure",
    description: "Прозрачный контур деплоя, обновлений и эксплуатации под реальные бизнес-нагрузки.",
    technologies: ["Docker", "Proxmox", "Nginx", "CI/CD"],
  },
  {
    title: "Tools",
    description: "Документирование, управление проектом и контроль качества на каждом этапе.",
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
            Выстраиваю стек так, чтобы MVP не приходилось переписывать при росте.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Сильная сторона не в наборе модных библиотек, а в связке между архитектурой, интерфейсом, API,
            инфраструктурой и процессом релиза.
          </p>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f2435]/80 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-200">Преимущество для бизнеса</div>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Вы получаете один технологический контур, где backend, frontend и эксплуатация спроектированы вместе.
              Это снижает стоимость доработок, уменьшает риск регрессий и ускоряет запуск новых функций.
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
