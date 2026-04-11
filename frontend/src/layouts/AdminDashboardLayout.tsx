import { Outlet, useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../modules/auth/auth-hooks";

const menu = [
  { label: "Обзор", value: "Сводка по рабочим зонам и ключевым операциям" },
  { label: "Заявки", value: "Обработка обращений и первичный контакт" },
  { label: "Портфолио", value: "Публикация кейсов и управление контентом" },
  { label: "Документы", value: "Договоры, счета и закрывающие материалы" },
  { label: "Поддержка", value: "Единый журнал вопросов и сопровождения" },
];

const overviewCards = [
  { label: "Заявки", value: "под контролем" },
  { label: "Контент", value: "в одной панели" },
  { label: "Документы", value: "по ролям" },
  { label: "Поддержка", value: "без потери контекста" },
];

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-white/5 p-6 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Панель управления</p>
            <h1 className="text-2xl font-display text-white">Управление проектами и контентом</h1>
            <p className="text-sm text-white/60">
              Единая внутренняя зона для заявок, публикаций, документов, сопровождения и административных процессов.
            </p>
          </div>

          <section className="mt-10" aria-labelledby="admin-sections-title">
            <h2 id="admin-sections-title" className="sr-only">
              Разделы административной панели
            </h2>
            <ul className="space-y-3">
              {menu.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="mt-1 text-xs text-white/55">{item.value}</div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 rounded-3xl border border-ember/30 bg-ember/10 p-4">
            <div className="text-sm font-semibold text-white">Вы вошли как</div>
            <div className="mt-1 text-lg font-display text-white">{session?.fullName ?? "Администратор"}</div>
            <div className="text-sm text-white/60">{session?.email ?? "Защищенный доступ администратора"}</div>
            <button
              type="button"
              disabled={logout.isPending}
              className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand"
              onClick={async () => {
                await logout.mutateAsync();
                navigate("/login", { replace: true });
              }}
            >
              {logout.isPending ? "Выходим..." : "Выйти"}
            </button>
          </div>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <header className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-aqua">Операционный центр</p>
                <h2 className="mt-3 text-3xl font-display text-white">Управляйте заявками, публикациями и документами из одной внутренней панели</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/65">
                  Административная зона собирает все ключевые процессы в одном месте: от контента сайта и заявок
                  до документов, рабочих статусов и сопровождения клиентов.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {overviewCards.map((card) => (
                  <MetricCard key={card.label} label={card.label} value={card.value} />
                ))}
              </div>
            </div>
          </header>

          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
      <div className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</div>
      <div className="mt-2 text-xl font-display text-white">{value}</div>
    </div>
  );
}
