import { useQuery } from "@tanstack/react-query";
import SiteHeader from "../components/navigation/SiteHeader";
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
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Software Development & Design</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-display leading-[0.95] sm:text-6xl lg:text-7xl">
                We turn agency websites into operational systems, not just brochures.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-lg">
                Northstar designs premium digital experiences, then backs them with secure client portals, CRM workflows, support tooling, and invoicing infrastructure.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-panel"
                >
                  Start a project
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex justify-center rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/25"
                >
                  View case studies
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-8 hidden h-28 w-28 rounded-full bg-aqua/20 blur-3xl sm:block" />
              <div className="absolute -bottom-6 right-4 h-32 w-32 rounded-full bg-ember/15 blur-3xl" />
              <div className="relative rounded-[36px] border border-black/5 bg-white/85 p-6 shadow-panel backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-2">
                  <PanelStat label="Projects launched" value="46" />
                  <PanelStat label="Avg. lead response" value="<2h" />
                  <PanelStat label="Client NPS" value="72" />
                  <PanelStat label="Ticket SLA" value="98%" />
                </div>
                <div className="mt-6 rounded-[28px] bg-ink p-6 text-white">
                  <div className="text-xs uppercase tracking-[0.35em] text-aqua">Blueprint Scope</div>
                  <div className="mt-4 text-2xl font-display">Website, dashboard, CRM, support, and invoices.</div>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    This starter is shaped for agencies that need both a polished public presence and strong internal operations.
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
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Portfolio</p>
              <h2 className="mt-4 text-4xl font-display">Selected delivery snapshots</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-steel">
              The frontend is already wired to the backend portfolio endpoint, so published case studies can flow directly into the marketing site.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <article key={project.id} className="rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-panel">
                  <div className="text-xs uppercase tracking-[0.35em] text-steel">{project.status.replace("_", " ")}</div>
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
                  title="Enterprise CRM Revamp"
                  description="A lead capture and support consolidation platform with milestone invoicing and role-based internal views."
                />
                <EmptyProjectCard
                  title="Design System Rollout"
                  description="A reusable React/Tailwind component system that unified public marketing pages and admin dashboards."
                />
                <EmptyProjectCard
                  title="Client Portal MVP"
                  description="Secure document exchange, project status visibility, and support ticketing for agency retainers."
                />
              </>
            )}
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-ink px-6 py-12 text-white shadow-panel sm:px-10">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Process</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-3">
              <ProcessStep title="Discover" copy="Map the funnel, operations, reporting needs, and client journey before code." />
              <ProcessStep title="Build" copy="Ship the backend foundation, frontend experience, and admin workflows as one cohesive platform." />
              <ProcessStep title="Scale" copy="Expand into automation, support SLAs, financial visibility, and documentation operations." />
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
            <p className="text-xs uppercase tracking-[0.35em] text-ember">Contact</p>
            <h2 className="mt-4 text-4xl font-display">Ready for a website that runs like part of the business?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-steel">
              The next layer is wiring the lead form to the `leads` table and mail notifications already accounted for in the backend blueprint.
            </p>
          </div>
        </section>
      </main>
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
      <div className="text-xs uppercase tracking-[0.35em] text-steel">Blueprint sample</div>
      <h3 className="mt-4 text-2xl font-display">{title}</h3>
      <p className="mt-3 text-sm leading-7">{description}</p>
    </article>
  );
}
