const leads = [
  { company: "Helio Commerce", contact: "Созвон с CTO", status: "Новый", value: "$24k" },
  { company: "Breach Labs", contact: "Коммерческое на согласовании", status: "В работе", value: "$61k" },
  { company: "AtlasCare", contact: "Подписан ретейнер", status: "Закрыт", value: "$96k" },
];

const finance = [
  { label: "Счета к оплате", value: "$31,800" },
  { label: "Договоры на подписи", value: "4" },
  { label: "Плановый биллинг по этапам", value: "$74,200" },
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
              <p className="text-xs uppercase tracking-[0.35em] text-aqua">CRM заявок</p>
              <h3 className="mt-3 text-2xl font-display text-white">Видимость по воронке продаж</h3>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/65">
              Отслеживание статусов
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-white/55">
                <tr>
                  <th className="px-4 py-3 font-medium">Компания</th>
                  <th className="px-4 py-3 font-medium">Этап</th>
                  <th className="px-4 py-3 font-medium">Статус</th>
                  <th className="px-4 py-3 font-medium">Сумма</th>
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
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Контент</p>
            <h3 className="mt-3 text-2xl font-display text-white">Очередь публикации кейсов</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="rounded-2xl bg-white/5 px-4 py-3">Новый fintech-кейс ждет финальные иллюстрации</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">Обновление текстов услуг запланировано к завершению спринта</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">Новая версия главной страницы подготовлена под позиционирование Q2</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Поддержка</p>
            <h3 className="mt-3 text-2xl font-display text-white">Сводка по тикетам</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <StatusTile label="Открыто" value="14" />
              <StatusTile label="Ждем клиента" value="6" />
              <StatusTile label="Закрыто сегодня" value="9" />
              <StatusTile label="Нарушено SLA" value="0" />
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
