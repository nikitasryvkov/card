import { Link } from "react-router-dom";
import { useLogout, useSession } from "../../modules/auth/auth-hooks";

const navItems = [
  { href: "/#services", label: "Услуги" },
  { href: "/#stack", label: "Стек" },
  { href: "/#portfolio", label: "Кейсы" },
  { href: "/#process", label: "Процесс" },
  { href: "/#contact", label: "Контакты" },
];

export default function SiteHeader() {
  const { data: session } = useSession();
  const logout = useLogout();
  const dashboardHref = session?.role === "ROLE_ADMIN" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08131d]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-panel">
            <div className="flex h-full items-center justify-center rounded-xl border border-white/10 font-display text-sm text-white">
              NS
            </div>
          </div>
          <div>
            <div className="font-display text-lg text-white">Срывков Systems</div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">Java • React • Infrastructure</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-white/70 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
                className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist sm:inline-flex"
              >
                Выйти
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
            className="inline-flex rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff7b51]"
          >
            Обсудить проект
          </a>
        </div>
      </div>
    </header>
  );
}
