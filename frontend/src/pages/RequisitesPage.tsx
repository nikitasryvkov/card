import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/navigation/SiteHeader";
import SiteFooter from "../components/navigation/SiteFooter";
import { businessInfo } from "../lib/business";

export default function RequisitesPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Реквизиты</p>
          <h1 className="mt-4 text-5xl font-display">Юридическая и платежная информация</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-steel">
            Эту страницу удобно использовать для договоров, счетов, проверки контрагента и размещения обязательной информации на сайте.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InfoBlock title="Предприниматель">
            <InfoRow label="Полное ФИО" value={businessInfo.fullName} />
            <InfoRow label="Сокращенное наименование" value={businessInfo.shortName} />
            <InfoRow label="ИНН" value={businessInfo.inn} />
            <InfoRow label="ОГРНИП" value={businessInfo.ogrnip} />
            <InfoRow label="ОКВЭД" value={businessInfo.okved.join(", ")} />
            <InfoRow label="Система налогообложения" value={businessInfo.taxation} />
          </InfoBlock>

          <InfoBlock title="Адреса и контакты">
            <InfoRow label="Адрес регистрации" value={businessInfo.registrationAddress} />
            <InfoRow label="Фактический адрес деятельности" value={businessInfo.businessAddress} />
            <InfoRow label="Телефон" value={businessInfo.contacts.phone} />
            <InfoRow label="Email" value={businessInfo.contacts.email} />
          </InfoBlock>

          <InfoBlock title="Банковские реквизиты">
            <InfoRow label="Расчетный счет" value={businessInfo.bank.account} />
            <InfoRow label="Банк" value={businessInfo.bank.name} />
            <InfoRow label="БИК" value={businessInfo.bank.bik} />
            <InfoRow label="Корреспондентский счет" value={businessInfo.bank.correspondentAccount} />
          </InfoBlock>

          <InfoBlock title="Для связи">
            <p className="text-sm leading-7 text-steel">
              Если вам нужен договор, счет или коммерческое предложение, отправьте запрос через форму на главной странице или напишите напрямую.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={businessInfo.contacts.emailHref} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                Написать на email
              </a>
              <Link to="/#contact" className="rounded-full border border-ink/10 px-5 py-3 text-sm font-semibold text-ink">
                Оставить заявку
              </Link>
            </div>
          </InfoBlock>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-panel">
      <h2 className="text-2xl font-display">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-sand px-4 py-4">
      <div className="text-xs uppercase tracking-[0.25em] text-steel">{label}</div>
      <div className="mt-2 text-sm leading-7 text-ink">{value}</div>
    </div>
  );
}
