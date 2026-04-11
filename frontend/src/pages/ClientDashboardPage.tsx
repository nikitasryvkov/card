import { useNavigate } from "react-router-dom";
import { useLogout, useSession } from "../modules/auth/auth-hooks";

const projects = [
  { name: "Редизайн сайта и структуры услуг", status: "В работе", milestone: "Авторизация и API портфолио", progress: "72%" },
  { name: "Автоматизация CRM-процессов", status: "На проверке", milestone: "QA сценариев обработки заявок", progress: "88%" },
];

const tickets = [
  { subject: "Форматирование PDF-счета", priority: "Средний", status: "Открыт" },
  { subject: "Доступ к загрузке подписанного договора", priority: "Высокий", status: "Ждем ответ" },
];

const documents = ["Договор на оказание услуг.pdf", "Гайд по фирменному стилю.fig", "Материалы спринта 03.zip"];

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
            <h1 className="mt-4 text-4xl font-display text-white">С возвращением, {session?.fullName ?? "клиент"}.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Эта защищенная зона предназначена для статусов проекта, доступа к документам, отслеживания счетов и общения с поддержкой.
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

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Проекты</p>
              <h2 className="mt-3 text-3xl font-display">Текущий статус работ</h2>
            </div>
            <span className="rounded-full bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-steel">
              Доступ по ролям
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {projects.map((project) => (
              <article key={project.name} className="rounded-[28px] bg-sand p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-display">{project.name}</h3>
                    <p className="mt-2 text-sm text-steel">{project.milestone}</p>
                  </div>
                  <div className="text-sm font-semibold text-ink">{project.progress}</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-steel">
                  <span>{project.status}</span>
                  <span>Активный этап</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Документы</p>
            <h2 className="mt-3 text-2xl font-display">Общие файлы</h2>
            <div className="mt-5 space-y-3">
              {documents.map((item) => (
                <div key={item} className="rounded-2xl bg-sand px-4 py-3 text-sm font-medium text-ink">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Поддержка</p>
            <h2 className="mt-3 text-2xl font-display">Последние обращения</h2>
            <div className="mt-5 space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.subject} className="rounded-2xl bg-sand px-4 py-4">
                  <div className="font-semibold text-ink">{ticket.subject}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-steel">
                    {ticket.priority} приоритет • {ticket.status}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
