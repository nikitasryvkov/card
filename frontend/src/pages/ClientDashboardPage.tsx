import { clearSession, getStoredSession } from "../modules/auth/auth-storage";

const projects = [
  { name: "Northstar agency redesign", status: "In progress", milestone: "Backend auth and portfolio API", progress: "72%" },
  { name: "CRM automation rollout", status: "Review", milestone: "Lead scoring workflow QA", progress: "88%" },
];

const tickets = [
  { subject: "Invoice PDF formatting", priority: "Medium", status: "Open" },
  { subject: "Upload access for signed contract", priority: "High", status: "Waiting for response" },
];

const documents = ["Master services agreement.pdf", "Brand guidelines.fig", "Sprint 03 deliverables.zip"];

export default function ClientDashboardPage() {
  const session = getStoredSession();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-ink p-8 text-white shadow-panel">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Client Dashboard</p>
            <h1 className="mt-4 text-4xl font-display text-white">Welcome back, {session?.user.fullName ?? "Client"}.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              This protected route is designed for project visibility, document access, invoice tracking, and support interactions.
            </p>
          </div>
          <button
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
            onClick={() => {
              clearSession();
              window.location.href = "/";
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Projects</p>
              <h2 className="mt-3 text-3xl font-display">Current delivery status</h2>
            </div>
            <span className="rounded-full bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-steel">
              RBAC protected
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
                  <span>Milestone active</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Documents</p>
            <h2 className="mt-3 text-2xl font-display">Shared files</h2>
            <div className="mt-5 space-y-3">
              {documents.map((item) => (
                <div key={item} className="rounded-2xl bg-sand px-4 py-3 text-sm font-medium text-ink">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Support</p>
            <h2 className="mt-3 text-2xl font-display">Recent tickets</h2>
            <div className="mt-5 space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.subject} className="rounded-2xl bg-sand px-4 py-4">
                  <div className="font-semibold text-ink">{ticket.subject}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-steel">
                    {ticket.priority} priority • {ticket.status}
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
