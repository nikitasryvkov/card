const extras = [
  {
    title: "Инфраструктура как сервис",
    description:
      "Не ограничиваюсь кодом: разворачиваю проект на выделенных серверах, настраиваю Docker-контур, reverse proxy, резервное копирование и базовую защиту сервиса.",
    bullets: ["Nginx и маршрутизация трафика", "Выделенные серверы и Proxmox-контур", "Бэкапы, релизы и контроль доступа"],
  },
  {
    title: "Прозрачность через личный кабинет",
    description:
      "Клиент видит статусы задач, документы, этапы проекта и обращения в поддержку без постоянного обмена файлами по почте и мессенджерам.",
    bullets: ["Статусы работ и milestone-этапы", "Документы, счета и закрывающие материалы", "Тикеты поддержки и журнал взаимодействия"],
  },
  {
    title: "AI-интеграции для бизнеса",
    description:
      "Помогаю внедрять генеративные модели и автоматизацию обработки данных там, где это реально экономит время команды и ускоряет операционные процессы.",
    bullets: ["AI-ассистенты и генерация контента", "Обработка документов и классификация данных", "Автоматизация типовых сценариев поддержки"],
  },
];

export default function BusinessExtrasSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Сверх программы</p>
          <h2 className="mt-4 text-4xl font-display text-white sm:text-5xl">
            Сайт выделяется, когда продает не “разработку по часам”, а решение под ключ.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
            Поэтому на сайте важно показать не только компетенции в коде, но и способность взять на себя запуск,
            прозрачность процесса и автоматизацию бизнес-операций.
          </p>

          <div className="mt-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-aqua/10 via-white/5 to-ember/10 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-aqua">Подход</div>
            <p className="mt-4 text-sm leading-7 text-white/80">
              В результате у клиента один понятный подрядчик: архитектура, UX/UI, разработка, выпуск в прод,
              документация и дальнейшее развитие без потери контекста.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {extras.map((extra) => (
            <article
              key={extra.title}
              className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-panel backdrop-blur"
            >
              <h3 className="text-2xl font-display text-white">{extra.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mist/75">{extra.description}</p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {extra.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-[22px] border border-white/10 bg-[#102435] px-4 py-4 text-sm text-white/80">
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
