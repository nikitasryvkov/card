import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import { businessInfo } from "../lib/business";

export default function RequisitesPage() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-ember sm:tracking-[0.35em]">Реквизиты</p>
          <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-5xl">
            Юридическая и платежная информация
          </h1>
          <p className="mt-4 max-w-3xl break-words text-base leading-8 text-mist/75">
            Страница содержит сведения об исполнителе, данные государственной регистрации, режим приема
            обращений, банковские реквизиты и контакты для выставления счета, подготовки договора и проверки
            контрагента.
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

          <InfoBlock title="Государственная регистрация">
            <InfoRow label="Дата регистрации" value={businessInfo.registrationDetails.date} />
            <InfoRow label="Регистрирующий орган" value={businessInfo.registrationDetails.authority} />
            <InfoRow label="Режим приема обращений" value={businessInfo.workingHours} />
          </InfoBlock>

          <InfoBlock title="Адреса и контакты">
            <InfoRow label="Адрес регистрации" value={businessInfo.registrationAddress} />
            <InfoRow label="Фактический адрес деятельности" value={businessInfo.businessAddress} />
            <InfoRow label="Телефон" value={businessInfo.contacts.phone} />
            <InfoRow label="Email" value={businessInfo.contacts.email} />
            <InfoRow label="Сайт" value={businessInfo.websiteUrl} />
          </InfoBlock>

          <InfoBlock title="Банковские реквизиты">
            <InfoRow label="Расчетный счет" value={businessInfo.bank.account} />
            <InfoRow label="Банк" value={businessInfo.bank.name} />
            <InfoRow label="БИК" value={businessInfo.bank.bik} />
            <InfoRow label="Корреспондентский счет" value={businessInfo.bank.correspondentAccount} />
          </InfoBlock>

          <InfoBlock title="Документы и связь">
            <p className="text-sm leading-7 text-mist/75">
              Для запроса договора, счета, коммерческого предложения или уточнения состава услуг можно
              написать на email, в Telegram или связаться по телефону.
            </p>

            <div className="mt-1 flex flex-wrap gap-3">
              <a
                href={businessInfo.contacts.emailHref}
                className="w-full rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-white/90 sm:w-auto"
              >
                Написать на email
              </a>
              <Link
                to="/offer"
                className="w-full rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 sm:w-auto"
              >
                Открыть оферту
              </Link>
              <Link
                to="/consent"
                className="w-full rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 sm:w-auto"
              >
                Согласие на обработку ПД
              </Link>
              <a
                href={businessInfo.contacts.telegramHref}
                className="w-full rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 sm:w-auto"
              >
                Написать в Telegram
              </a>
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
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur">
      <h2 className="text-2xl font-display leading-tight text-white">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#102435] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.18em] text-aqua/80 sm:tracking-[0.25em]">{label}</div>
      <div className="mt-2 break-all text-sm leading-7 text-white/85 sm:break-words">{value}</div>
    </div>
  );
}
