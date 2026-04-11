const leads = [
  { company: "Helio Commerce", contact: "CTO intro call", status: "New", value: "$24k" },
  { company: "Breach Labs", contact: "Proposal in review", status: "In Progress", value: "$61k" },
  { company: "AtlasCare", contact: "Retainer signed", status: "Closed", value: "$96k" },
];

const finance = [
  { label: "Outstanding invoices", value: "$31,800" },
  { label: "Contracts awaiting signature", value: "4" },
  { label: "Projected milestone billing", value: "$74,200" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-3">
        {finance.map((item) => (
          <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.28em] text-white/45">{item.label}</div>
            <div className="mt-3 text-3xl font-display text-white">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-aqua">Lead CRM</p>
              <h3 className="mt-3 text-2xl font-display text-white">Pipeline visibility</h3>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/65">
              Status tracking
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-white/55">
                <tr>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leads.map((lead) => (
                  <tr key={lead.company} className="text-white">
                    <td className="px-4 py-4">{lead.company}</td>
                    <td className="px-4 py-4 text-white/70">{lead.contact}</td>
                    <td className="px-4 py-4">{lead.status}</td>
                    <td className="px-4 py-4">{lead.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Content Ops</p>
            <h3 className="mt-3 text-2xl font-display text-white">Portfolio publishing queue</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="rounded-2xl bg-white/5 px-4 py-3">New fintech case study waiting for final imagery</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">Service page copy update scheduled for sprint close</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">Homepage proof mapped to Q2 positioning narrative</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Support</p>
            <h3 className="mt-3 text-2xl font-display text-white">Ticket escalation summary</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <StatusTile label="Open" value="14" />
              <StatusTile label="Waiting on client" value="6" />
              <StatusTile label="Resolved today" value="9" />
              <StatusTile label="Breached SLA" value="0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 px-4 py-5">
      <div className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</div>
      <div className="mt-3 text-2xl font-display text-white">{value}</div>
    </div>
  );
}
