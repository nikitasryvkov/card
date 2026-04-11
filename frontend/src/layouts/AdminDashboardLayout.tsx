import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../modules/auth/auth-hooks";

const menu = [
  { label: "Обзор", value: "Ключевые показатели в реальном времени" },
  { label: "Лиды", value: "CRM и воронка входящих заявок" },
  { label: "Проекты", value: "Кейсы, производство и клиентские задачи" },
  { label: "Финансы", value: "Счета, договоры и платежи" },
  { label: "Поддержка", value: "Тикеты и эскалации" },
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
            <h1 className="text-2xl font-display text-white">Срывков Digital OS</h1>
            <p className="text-sm text-white/60">
              Единая точка управления продажами, проектами и внутренними операциями.
            </p>
          </div>

          <nav className="mt-10 space-y-3">
            {menu.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="mt-1 text-xs text-white/55">{item.value}</div>
              </div>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl border border-ember/30 bg-ember/10 p-4">
            <div className="text-sm font-semibold text-white">Вы вошли как</div>
            <div className="mt-1 text-lg font-display text-white">{session?.fullName ?? "Администратор"}</div>
            <div className="text-sm text-white/60">{session?.email ?? "admin@agency.local"}</div>
            <button
              className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand"
              onClick={async () => {
                await logout.mutateAsync();
                navigate("/login", { replace: true });
              }}
            >
              Выйти
            </button>
          </div>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">
          <header className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-aqua">Операционный центр</p>
                <h2 className="mt-3 text-3xl font-display text-white">Контролируйте все ключевые точки работы с клиентом</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/65">
                  Управляйте заявками, контентом сайта, проектами, договорами и поддержкой из одной внутренней панели.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <MetricCard label="Выручка под контролем" value="$128k" />
                <MetricCard label="Открытые лиды" value="37" />
                <MetricCard label="Активные спринты" value="12" />
                <MetricCard label="Соблюдение SLA" value="98%" />
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
