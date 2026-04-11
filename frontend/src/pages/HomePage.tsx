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
  "Работающий MVP, кабинет клиента или внутренняя система под ваши процессы",
  "Backend на Java, интерфейс на React, база данных, роли доступа и API",
  "Публикация на сервере, документация и понятный план развития после релиза",
];

const operatingModel = [
  "Архитектура backend, API и контур безопасности под реальные бизнес-сценарии",
  "Личные кабинеты, CRM, административные панели и интерфейсы для ежедневной работы команды",
  "Публикация на сервере, Nginx, SSL, бэкапы и сопровождение после запуска",
];

const processSteps = [
  {
    title: "Аналитика",
    copy: "Собираю требования, помогаю сформулировать состав MVP, уточняю сценарии пользователей и заранее фиксирую ограничения по срокам, интеграциям и безопасности.",
  },
  {
    title: "Проектирование",
    copy: "Продумываю структуру базы данных, API, роли доступа, карту экранов и логику интерфейса. На этом этапе формируется фундамент, который выдержит дальнейшее развитие продукта.",
  },
  {
    title: "Разработка",
    copy: "Поэтапно собираю backend, frontend и административные сценарии. На каждом этапе видно, что уже готово, что тестируется и что идет в ближайший релиз.",
  },
  {
    title: "Запуск и поддержка",
    copy: "Настраиваю публикацию на сервере, логирование, резервное копирование и контур обновлений. После релиза проект не остается без сопровождения и контроля.",
  },
];

const fallbackProjects = [
  {
    title: "Личный кабинет для сервиса услуг",
    description:
      "Онлайн-заявки, документы, статусы работ, история обращений и единый рабочий контур для клиента и исполнителя.",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL"],
  },
  {
    title: "Внутренняя CRM и административная панель",
    description:
      "Управление лидами, задачами, публикацией контента, ролями доступа и рабочими процессами без хаоса в таблицах и мессенджерах.",
    stack: ["Spring Security", "REST API", "React", "Tailwind CSS"],
  },
  {
    title: "Корпоративный сайт с инфраструктурой под ключ",
    description:
      "Маркетинговые страницы, формы заявок, интеграция с backend, публикация на сервере, SSL, резервное копирование и дальнейшая поддержка.",
    stack: ["Vite", "Nginx", "Docker", "Proxmox"],
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
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-aqua sm:tracking-[0.35em]">Разработка ПО • Архитектура • UX/UI</p>
                <h1 className="mt-6 max-w-5xl break-words text-3xl font-display leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                  Создаем отказоустойчивые ИТ-решения: от интерфейса до серверной архитектуры.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-mist/80 sm:text-lg">
                  Вы получаете не просто разработку, а готовую цифровую систему: backend на Java, интерфейс на React,
                  базу данных, роли доступа и публикацию на сервере. Подходит для MVP, личных кабинетов, CRM и
                  внутренних сервисов, которые нужно запускать без технического хаоса и переписывания после первого
                  релиза.
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
                    <div
                      key={item}
                      className="min-w-0 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-w-0">
                <div className="absolute -left-3 top-12 hidden h-32 w-32 rounded-full bg-aqua/20 blur-3xl sm:block" />
                <div className="absolute -bottom-8 right-0 h-36 w-36 rounded-full bg-ember/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl sm:p-6">
                  <div className="min-w-0 rounded-[28px] border border-white/10 bg-white/5 px-5 py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-[0.2em] text-aqua sm:tracking-[0.3em]">Под ключ</div>
                        <div className="mt-2 break-words text-xl font-display leading-tight text-white sm:text-2xl">
                          От идеи и MVP до релиза на сервере
                        </div>
                      </div>
                      <div className="max-w-full whitespace-normal break-words rounded-full border border-white/10 bg-white/10 px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-white/70 sm:tracking-[0.2em]">
                        Clean Architecture
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {operatingModel.map((item, index) => (
                      <div key={item} className="min-w-0 rounded-[28px] border border-white/10 bg-[#0f2435]/80 p-5">
                        <div className="text-xs uppercase tracking-[0.2em] text-aqua/80 sm:tracking-[0.3em]">0{index + 1}</div>
                        <div className="mt-3 text-sm leading-7 text-white/80">{item}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[28px] border border-emerald-300/20 bg-emerald-300/10 px-5 py-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-emerald-200 sm:tracking-[0.3em]">Результат для бизнеса</div>
                    <p className="mt-3 text-sm leading-7 text-white/80">
                      На выходе у вас рабочий код, задеплоенный сервис, документация по API и понятный план развития
                      продукта. Это снижает риск потери контекста, упрощает дальнейшие доработки и ускоряет запуск
                      следующих функций.
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
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.22em] text-ember sm:tracking-[0.35em]">Форматы проектов</p>
              <h2 className="mt-4 text-3xl font-display leading-tight text-white sm:text-4xl">
                Решения, которые можно запускать и развивать без переписывания с нуля
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-mist/70">
              Ниже показаны направления работ, с которыми я чаще всего помогаю бизнесу: личные кабинеты,
              административные панели, внутренние сервисы и сайты с полноценным серверным контуром.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.length > 0
              ? projects.slice(0, 3).map((project) => (
                  <article
                    key={project.id}
                    className="min-w-0 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur"
                  >
                    <div className="text-xs uppercase tracking-[0.22em] text-aqua sm:tracking-[0.35em]">
                      {translateProjectStatus(project.status)}
                    </div>
                    <h3 className="mt-4 break-words text-xl font-display leading-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mist/75">{project.shortDescription}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((item) => (
                        <span
                          key={item}
                          className="max-w-full break-words rounded-full border border-white/10 bg-[#102435] px-3 py-1 text-xs font-semibold text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              : fallbackProjects.map((project) => (
                  <article
                    key={project.title}
                    className="min-w-0 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur"
                  >
                    <div className="text-xs uppercase tracking-[0.22em] text-aqua/80 sm:tracking-[0.35em]">Направление работ</div>
                    <h3 className="mt-4 break-words text-xl font-display leading-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mist/75">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="max-w-full break-words rounded-full border border-white/10 bg-[#102435] px-3 py-1 text-xs font-semibold text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[40px] border border-white/10 bg-[#0d1d2b] px-6 py-12 text-white shadow-panel sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-aqua sm:tracking-[0.35em]">Как строится работа</p>
                <h2 className="mt-4 text-3xl font-display leading-tight text-white sm:text-4xl">
                  Предсказуемый процесс вместо хаотичной разработки без опоры на архитектуру
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/70">
                На каждом этапе понятно, что уже сделано, какие решения приняты, где находятся риски и когда проект
                переходит к следующему шагу: от аналитики до публикации на сервере.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
    <div className="min-w-0 rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-aqua sm:tracking-[0.3em]">Шаг 0{index}</div>
      <h3 className="mt-4 break-words text-xl font-display leading-tight text-white sm:text-2xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{copy}</p>
    </div>
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
