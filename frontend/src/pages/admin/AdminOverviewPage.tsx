const controlAreas = [
  {
    title: "Заявки и первичный контакт",
    description:
      "Фиксация входящих обращений, распределение статусов, подготовка к созвону и перевод лида в рабочий процесс без потери контекста.",
  },
  {
    title: "Контент сайта и кейсы",
    description:
      "Публикация услуг, обновление портфолио, корректировка текстов и управление тем, что видит клиент на публичной части сайта.",
  },
  {
    title: "Документы и расчеты",
    description:
      "Хранение договоров, счетов, актов и сопроводительных материалов в едином административном контуре с понятным доступом по ролям.",
  },
];

const workingFlows = [
  "Обновление контента сайта и кейсов",
  "Подготовка документов и согласований по проекту",
  "Контроль обращений и поддержка клиентов",
  "Ведение внутреннего операционного контура без разрозненных таблиц",
];

const publicationChecklist = [
  "Актуальные услуги и формулировки на главной странице",
  "Портфолио и кейсы, готовые к публикации",
  "Юридическая информация, реквизиты и политика конфиденциальности",
  "Контроль формы заявок и маршрута обработки обращений",
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-3">
        {controlAreas.map((item) => (
          <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.28em] text-white/45">{item.title}</div>
            <div className="mt-3 text-sm leading-7 text-white/75">{item.description}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-aqua">Операционный контур</p>
              <h3 className="mt-3 text-2xl font-display text-white">Что администратор контролирует из этой панели</h3>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/65">
              Единая рабочая зона
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            {workingFlows.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Публикация</p>
            <h3 className="mt-3 text-2xl font-display text-white">Что должно быть под контролем перед обновлением сайта</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {publicationChecklist.map((item) => (
                <li key={item} className="rounded-2xl bg-white/5 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Назначение панели</p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Эта зона предназначена для реального администрирования проекта: контента, заявок, документов,
              поддержки и внутренних процессов. Здесь нет вымышленных показателей — только рабочая структура,
              которую можно наполнять фактическими данными по мере подключения модулей.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
