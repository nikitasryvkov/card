import { useQuery } from "@tanstack/react-query";
import SiteHeader from "../components/navigation/SiteHeader";
import SiteFooter from "../components/navigation/SiteFooter";
import ContactSection from "../components/sections/ContactSection";
import Services from "../components/sections/Services";
import { fetchPortfolioProjects } from "../api/portfolio";

export default function HomePage() {
  const { data: projects = [] } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: fetchPortfolioProjects,
  });

  return (
    <div>
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Разработка и дизайн для бизнеса</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-display leading-[0.95] sm:text-6xl lg:text-7xl">
                Создаю сайты и цифровые сервисы, которые не просто выглядят хорошо, а реально помогают бизнесу работать.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-lg">
                Разрабатываю сайты-визитки, корпоративные сайты, клиентские кабинеты и внутренние системы с упором на надежность, удобство и рост конверсии.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel"
                >
                  Обсудить задачу
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex justify-center rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/25"
                >
                  Смотреть кейсы
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-8 hidden h-28 w-28 rounded-full bg-aqua/20 blur-3xl sm:block" />
              <div className="absolute -bottom-6 right-4 h-32 w-32 rounded-full bg-ember/15 blur-3xl" />
              <div className="relative rounded-[36px] border border-black/5 bg-white/85 p-6 shadow-panel backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-2">
                  <PanelStat label="Запущено проектов" value="46" />
                  <PanelStat label="Ответ по заявке" value="<2ч" />
                  <PanelStat label="Оценка клиентов" value="72" />
                  <PanelStat label="SLA поддержки" value="98%" />
                </div>
                <div className="mt-6 rounded-[28px] bg-ink p-6 text-white">
                  <div className="text-xs uppercase tracking-[0.35em] text-aqua">Что входит</div>
                  <div className="mt-4 text-2xl font-display">Сайт, CRM, кабинет клиента, поддержка и финансовые процессы.</div>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Этот стартовый шаблон подходит для IT-услуг, агентств и экспертных бизнесов, которым нужен сильный публичный образ и удобная внутренняя операционка.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Services />

        <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Кейсы</p>
              <h2 className="mt-4 text-4xl font-display">Примеры задач и решений</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-steel">
              Фронтенд уже подключен к backend-эндпоинту портфолио, поэтому опубликованные кейсы могут автоматически попадать на сайт.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <article key={project.id} className="rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-panel">
                  <div className="text-xs uppercase tracking-[0.35em] text-steel">{translateProjectStatus(project.status)}</div>
                  <h3 className="mt-4 text-2xl font-display">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7">{project.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((item) => (
                      <span key={item} className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            ) : (
              <>
                <EmptyProjectCard
                  title="Обновление CRM для сервисной компании"
                  description="Система захвата заявок, поддержки клиентов и этапного выставления счетов с разграничением ролей."
                />
                <EmptyProjectCard
                  title="Запуск дизайн-системы"
                  description="Переиспользуемая система компонентов на React и Tailwind для сайта, кабинета клиента и внутренней панели."
                />
                <EmptyProjectCard
                  title="MVP клиентского кабинета"
                  description="Безопасный обмен документами, статусы проекта и тикетинг поддержки для клиентов на сопровождении."
                />
              </>
            )}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-ink px-6 py-12 text-white shadow-panel sm:px-10">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Процесс</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-3">
              <ProcessStep title="Исследование" copy="Сначала разбираю задачи бизнеса, путь клиента, точки продаж и внутренние процессы." />
              <ProcessStep title="Реализация" copy="Далее собираю backend, frontend и административные сценарии как единую платформу." />
              <ProcessStep title="Рост" copy="После запуска расширяем проект: автоматизация, поддержка, аналитика, документы и биллинг." />
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function PanelStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] bg-sand p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-steel">{label}</div>
      <div className="mt-3 text-3xl font-display text-ink">{value}</div>
    </div>
  );
}

function ProcessStep({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-display text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{copy}</p>
    </div>
  );
}

function EmptyProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-panel">
      <div className="text-xs uppercase tracking-[0.35em] text-steel">Пример из шаблона</div>
      <h3 className="mt-4 text-2xl font-display">{title}</h3>
      <p className="mt-3 text-sm leading-7">{description}</p>
    </article>
  );
}

function translateProjectStatus(status: string) {
  const statusMap: Record<string, string> = {
    DISCOVERY: "Исследование",
    IN_PROGRESS: "В работе",
    REVIEW: "На проверке",
    COMPLETED: "Завершен",
    ON_HOLD: "На паузе",
  };

  return statusMap[status] ?? status;
}
