import { Link } from "react-router-dom";
import { businessInfo } from "../../lib/business";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Реквизиты и контакты</p>
          <h2 className="mt-4 text-3xl font-display">{businessInfo.shortName}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-steel">
            Разработка сайтов, интерфейсов и цифровых сервисов для малого бизнеса, экспертов и IT-проектов.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href={businessInfo.contacts.phoneHref}
              className="rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink hover:border-ink/20"
            >
              {businessInfo.contacts.phone}
            </a>
            <a
              href={businessInfo.contacts.emailHref}
              className="rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink hover:border-ink/20"
            >
              {businessInfo.contacts.email}
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[28px] border border-black/5 bg-sand p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-steel">Идентификаторы</p>
            <div className="mt-4 space-y-3 text-sm text-ink">
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

          <div className="rounded-[28px] border border-black/5 bg-sand p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-steel">Навигация</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link className="block font-semibold text-ink hover:text-ember" to="/requisites">
                Полные реквизиты
              </Link>
              <Link className="block font-semibold text-ink hover:text-ember" to="/privacy">
                Политика конфиденциальности
              </Link>
              <a className="block font-semibold text-ink hover:text-ember" href="/#contact">
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 px-4 py-4 text-center text-xs text-steel sm:px-6 lg:px-8">
        {businessInfo.shortName} • ОКВЭД: {businessInfo.okved.join(", ")} • Система налогообложения: {businessInfo.taxation}
      </div>
    </footer>
  );
}
