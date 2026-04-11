import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioProjects } from "../api/portfolio";
import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import BusinessExtrasSection from "../components/sections/BusinessExtrasSection";
import ContactSection from "../components/sections/ContactSection";
import MvpCalculatorSection from "../components/sections/MvpCalculatorSection";
import Services from "../components/sections/Services";
import TechStackSection from "../components/sections/TechStackSection";

const heroDeliverables = [
  "MVP и внутренние системы на Java + React",
  "Архитектура, которая выдерживает рост нагрузки",
  "UX/UI дизайн без разрыва между макетом и реализацией",
];

const operatingModel = [
  "Проектирование highload backend и API-first архитектуры",
  "Личные кабинеты, CRM, админ-панели и сервисные порталы",
  "Развертывание, бэкапы, reverse proxy и сопровождение после запуска",
];

const processSteps = [
  {
    title: "Аналитика",
    copy: "Собираю требования, формулирую user stories, выделяю риски и границы MVP, чтобы проект стартовал без лишних допущений.",
  },
  {
    title: "Проектирование",
    copy: "Продумываю архитектуру БД, API, контуры безопасности и UX-прототипы. На этом этапе закладывается масштабируемость.",
  },
  {
    title: "Разработка",
    copy: "Итеративно собираю backend, frontend и административные сценарии. Показываю промежуточные демо и синхронизирую приоритеты.",
  },
  {
    title: "QA и деплой",
    copy: "Провожу тестирование, выпускаю в продакшн, настраиваю инфраструктуру, мониторинг и дальнейшую поддержку.",
  },
];

export default function HomePage() {
  const { data: projects = [] } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: fetchPortfolioProjects,
  });

  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(68,211,199,0.16),_transparent_28%),radial-gradient(circle_at_85%_20%,_rgba(244,106,58,0.18),_transparent_22%),linear-gradient(180deg,_rgba(8,19,29,1)_0%,_rgba(9,18,28,1)_100%)]" />
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-8 right-0 h-72 w-72 rounded-full bg-ember/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-aqua">Java • React • Infrastructure</p>
                <h1 className="mt-6 max-w-5xl text-5xl font-display leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                  Создаем отказоустойчивые ИТ-решения: от интерфейса до серверной архитектуры.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-mist/80 sm:text-lg">
                  Полный цикл разработки ПО, проектирование высоконагруженных систем и современный UX/UI дизайн.
                  Реализуем ваш MVP на стеке Java + React с гарантией масштабируемости и понятным маршрутом роста.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
                  >
                    Обсудить проект
                  </a>
                  <a
                    href="#calculator"
                    className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Получить консультацию
                  </a>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {heroDeliverables.map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-12 hidden h-32 w-32 rounded-full bg-aqua/20 blur-3xl sm:block" />
                <div className="absolute -bottom-8 right-0 h-36 w-36 rounded-full bg-ember/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-aqua">Под ключ</div>
                      <div className="mt-2 text-2xl font-display text-white">От MVP до production-инфраструктуры</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                      Clean Architecture
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {operatingModel.map((item, index) => (
                      <div key={item} className="rounded-[28px] border border-white/10 bg-[#0f2435]/80 p-5">
                        <div className="text-xs uppercase tracking-[0.3em] text-aqua/80">0{index + 1}</div>
                        <div className="mt-3 text-sm leading-7 text-white/80">{item}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[28px] border border-emerald-300/20 bg-emerald-300/10 px-5 py-5">
                    <div className="text-xs uppercase tracking-[0.3em] text-emerald-200">Для бизнеса это значит</div>
                    <p className="mt-3 text-sm leading-7 text-white/80">
                      Вы получаете не только код, а предсказуемую систему: архитектуру, дизайн, релизный контур,
                      документирование API и поддержку после запуска.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <TechStackSection />

        <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Кейсы и сценарии</p>
              <h2 className="mt-4 text-4xl font-display text-white">Примеры решений, которые можно запускать и масштабировать</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-mist/70">
              Портфолио уже связано с backend, поэтому опубликованные кейсы можно управляемо выводить из админ-панели
              без ручной правки фронтенда.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <article
                  key={project.id}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur"
                >
                  <div className="text-xs uppercase tracking-[0.35em] text-aqua">{translateProjectStatus(project.status)}</div>
                  <h3 className="mt-4 text-2xl font-display text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-mist/75">{project.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-[#102435] px-3 py-1 text-xs font-semibold text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            ) : (
              <>
                <EmptyProjectCard
                  title="MVP B2B-платформы для сервиса с личным кабинетом"
                  description="Каталог услуг, заявки, статусы работ, документы и уведомления в одном клиентском контуре с безопасным доступом по ролям."
                />
                <EmptyProjectCard
                  title="Рефакторинг legacy backend на Spring Boot"
                  description="Переход на современную архитектуру, нормализацию API, документацию Swagger и подготовку сервиса к горизонтальному масштабированию."
                />
                <EmptyProjectCard
                  title="Дизайн-система и админ-панель для внутренней команды"
                  description="Единая UI-система, сценарии поддержки, отчетность и ускорение вывода новых функций без хаоса в интерфейсах."
                />
              </>
            )}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[40px] border border-white/10 bg-[#0d1d2b] px-6 py-12 text-white shadow-panel sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-aqua">Как мы работаем</p>
                <h2 className="mt-4 text-4xl font-display text-white">Предсказуемый процесс вместо “сначала сделаем, потом подумаем”</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/70">
                На каждом этапе видно, что происходит с проектом: какие решения приняты, что уже в разработке и что
                выходит в продакшн.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <ProcessStep key={step.title} index={index + 1} title={step.title} copy={step.copy} />
              ))}
            </div>
          </div>
        </section>

        <BusinessExtrasSection />
        <MvpCalculatorSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

function ProcessStep({ index, title, copy }: { index: number; title: string; copy: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="text-xs uppercase tracking-[0.3em] text-aqua">Шаг 0{index}</div>
      <h3 className="mt-4 text-2xl font-display text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{copy}</p>
    </div>
  );
}

function EmptyProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
      <div className="text-xs uppercase tracking-[0.35em] text-aqua/80">Типовой сценарий</div>
      <h3 className="mt-4 text-2xl font-display text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-mist/75">{description}</p>
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
