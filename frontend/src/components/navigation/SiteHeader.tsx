import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout, useSession } from "../../modules/auth/auth-hooks";

const navItems = [
  { href: "/#services", label: "Услуги" },
  { href: "/#stack", label: "Стек" },
  { href: "/#portfolio", label: "Кейсы" },
  { href: "/#process", label: "Процесс" },
  { href: "/#contact", label: "Контакты" },
];

export default function SiteHeader() {
  const location = useLocation();
  const { data: session } = useSession();
  const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dashboardHref = session?.role === "ROLE_ADMIN" ? "/admin" : "/dashboard";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08131d]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="min-w-0 flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-panel">
            <div className="flex h-full items-center justify-center rounded-xl border border-white/10 font-display text-sm text-white">
              NS
            </div>
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-lg text-white">Срывков Systems</div>
            <div className="hidden text-xs uppercase tracking-[0.3em] text-white/50 sm:block">
              Java • React • Серверная архитектура
            </div>
          </div>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-white/70 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {session ? (
            <>
              <Link
                to={dashboardHref}
                className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-white/25 sm:inline-flex"
              >
                {session.role === "ROLE_ADMIN" ? "Админка" : "Кабинет"}
              </Link>
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist disabled:opacity-60 sm:inline-flex"
              >
                {logout.isPending ? "Выходим..." : "Выйти"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-white/25 sm:inline-flex"
              >
                Регистрация
              </Link>
              <Link
                to="/login"
                className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist sm:inline-flex"
              >
                Войти
              </Link>
            </>
          )}

          <a
            href="/#contact"
            className="inline-flex rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff7b51] sm:px-5"
          >
            <span className="sm:hidden">Заявка</span>
            <span className="hidden sm:inline">Обсудить проект</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-white/25 md:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Закрыть меню" : "Открыть меню"}</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-[#08131d]/95 px-4 py-4 md:hidden sm:px-6">
          <nav aria-label="Мобильная навигация" className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:border-white/25 hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid gap-2">
            {session ? (
              <>
                <Link
                  to={dashboardHref}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                >
                  {session.role === "ROLE_ADMIN" ? "Перейти в админку" : "Перейти в кабинет"}
                </Link>
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {logout.isPending ? "Выходим..." : "Выйти"}
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  Регистрация
                </Link>
                <Link to="/login" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink">
                  Войти
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
