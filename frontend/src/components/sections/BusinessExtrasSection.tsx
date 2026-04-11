const extras = [
  {
    title: "Инфраструктура как сервис",
    description:
      "Вы можете отдать не только разработку, но и запуск проекта под ключ: сервер, Nginx, SSL, резервное копирование и базовый контур защиты без поиска отдельных подрядчиков под каждый этап.",
    bullets: [
      "Сервер, Nginx и SSL под запуск проекта",
      "Docker-контур и инфраструктура на выделенных мощностях",
      "Бэкапы, релизы и базовый контроль доступа",
    ],
  },
  {
    title: "Прозрачность через личный кабинет",
    description:
      "Вы видите статусы задач, документы, этапы проекта и обращения в поддержку в одном месте. Это снижает зависимость от переписок в почте и мессенджерах и делает процесс предсказуемее.",
    bullets: [
      "Статусы работ и milestone-этапы",
      "Документы, счета и закрывающие материалы",
      "Тикеты поддержки и журнал взаимодействия",
    ],
  },
  {
    title: "AI-интеграции для бизнеса",
    description:
      "AI подключается там, где он реально экономит время команды: обработка документов, поиск по знаниям, генерация черновиков и автоматизация повторяющихся операций.",
    bullets: [
      "AI-ассистенты для типовых внутренних задач",
      "Обработка документов и поиск по базе знаний",
      "Автоматизация повторяющихся сценариев поддержки",
    ],
  },
];

export default function BusinessExtrasSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.22em] text-ember sm:tracking-[0.35em]">Сверх программы</p>
          <h2 className="mt-4 text-3xl font-display leading-tight text-white sm:text-5xl">
            Здесь продается не разработка по часам, а решение, которое можно реально запустить и сопровождать.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Для бизнеса это значит проще: один контур ответственности, меньше ручной координации и больше контроля над
            сроками, запуском и последующей поддержкой.
          </p>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-aqua/10 via-white/5 to-ember/10 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-aqua sm:tracking-[0.3em]">Подход</div>
            <p className="mt-4 text-sm leading-7 text-white/80">
              В результате вы получаете одного понятного подрядчика: архитектура, UX/UI, разработка, выпуск в прод,
              документация и дальнейшее развитие без передачи проекта между несколькими командами.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {extras.map((extra) => (
            <article key={extra.title} className="min-w-0 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-7">
              <h3 className="break-words text-xl font-display leading-tight text-white sm:text-2xl">{extra.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist/75">{extra.description}</p>

              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {extra.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="min-w-0 rounded-[22px] border border-white/10 bg-[#102435] px-4 py-4 text-sm text-white/80"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
