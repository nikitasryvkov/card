import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#061019]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-aqua">Реквизиты и контакты</p>
          <h2 className="mt-4 text-2xl font-display text-white sm:text-3xl">{businessInfo.shortName}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/70">
            Разработка ПО, архитектура высоконагруженных систем, UX/UI дизайн и запуск цифровых сервисов под
            ключ для бизнеса и продуктовых команд.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href={businessInfo.contacts.phoneHref}
              className="rounded-full border border-white/10 px-4 py-2 font-semibold text-white transition hover:border-white/25"
            >
              {businessInfo.contacts.phone}
            </a>
            <a
              href={businessInfo.contacts.emailHref}
              className="break-all rounded-full border border-white/10 px-4 py-2 font-semibold text-white transition hover:border-white/25"
            >
              {businessInfo.contacts.email}
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Идентификаторы</p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div>
                <div className="font-semibold">ИНН</div>
                <div>{businessInfo.inn}</div>
              </div>
              <div>
                <div className="font-semibold">ОГРНИП</div>
                <div>{businessInfo.ogrnip}</div>
              </div>
            </div>
          </div>

          <nav className="rounded-[28px] border border-white/10 bg-white/5 p-5" aria-label="Юридическая информация">
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/80">Документы</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link className="block font-semibold text-white transition hover:text-aqua" to="/requisites">
                Полные реквизиты
              </Link>
              <Link className="block font-semibold text-white transition hover:text-aqua" to="/offer">
                Публичная оферта
              </Link>
              <Link className="block font-semibold text-white transition hover:text-aqua" to="/privacy">
                Политика конфиденциальности
              </Link>
              <a className="block font-semibold text-white transition hover:text-aqua" href="/#contact">
                Оставить заявку
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs leading-6 text-white/50 sm:px-6 lg:px-8">
        <span className="break-words">
          {businessInfo.shortName} • ОКВЭД: {businessInfo.okved.join(", ")} • Система налогообложения:{" "}
          {businessInfo.taxation}
        </span>
      </div>
    </footer>
  );
}
