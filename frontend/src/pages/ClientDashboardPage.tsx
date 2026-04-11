import { useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../modules/auth/auth-hooks";

const workspaceModules = [
  {
    title: "Статусы проекта",
    description: "Здесь удобно отслеживать текущий этап работ, приоритеты, согласования и ближайшие релизы.",
    items: ["Этапы и сроки", "Комментарии по задачам", "Промежуточные согласования"],
  },
  {
    title: "Документы и материалы",
    description: "В одном месте собираются договоры, счета, закрывающие документы, макеты и материалы по проекту.",
    items: ["Договоры и приложения", "Счета и акты", "Файлы, макеты и спецификации"],
  },
  {
    title: "Поддержка и коммуникация",
    description: "Рабочие вопросы, обращения и договоренности фиксируются в едином контуре без потери контекста.",
    items: ["История обращений", "Приоритеты и статусы", "Ответы и договоренности"],
  },
];

const clientBenefits = [
  "Все материалы по проекту находятся в одном рабочем пространстве.",
  "Не нужно собирать переписку по почте и мессенджерам в ручном режиме.",
  "Доступ к документам и рабочим этапам открывается только авторизованным пользователям.",
];

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const logout = useLogout();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-ink p-8 text-white shadow-panel">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Кабинет клиента</p>
            <h1 className="mt-4 text-4xl font-display text-white">Здравствуйте, {session?.fullName ?? "клиент"}.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Это закрытая рабочая зона для проекта: здесь можно видеть этапы работ, получать документы,
              хранить материалы и вести коммуникацию в одном месте.
            </p>
          </div>
          <button
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
            onClick={async () => {
              await logout.mutateAsync();
              navigate("/", { replace: true });
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Рабочие модули</p>
          <h2 className="mt-3 text-3xl font-display text-ink">Все, что нужно для сопровождения проекта</h2>

          <div className="mt-6 grid gap-4">
            {workspaceModules.map((module) => (
              <article key={module.title} className="rounded-[28px] bg-sand p-5">
                <h3 className="text-xl font-display text-ink">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{module.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Преимущества кабинета</p>
            <h2 className="mt-3 text-2xl font-display text-ink">Прозрачность работы без лишней переписки</h2>
            <div className="mt-5 space-y-3">
              {clientBenefits.map((item) => (
                <div key={item} className="rounded-2xl bg-sand px-4 py-4 text-sm leading-7 text-ink">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Доступ и безопасность</p>
            <h2 className="mt-3 text-2xl font-display text-ink">Материалы проекта доступны только авторизованным пользователям</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-sand px-4 py-4 text-sm text-steel">Защищенный вход в рабочую зону</div>
              <div className="rounded-2xl bg-sand px-4 py-4 text-sm text-steel">Разграничение доступа по ролям</div>
              <div className="rounded-2xl bg-sand px-4 py-4 text-sm text-steel">Единая история взаимодействия по проекту</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
