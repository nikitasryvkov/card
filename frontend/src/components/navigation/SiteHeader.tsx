import { Link } from "react-router-dom";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-sand/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-ink p-2 text-sand shadow-panel">
            <div className="flex h-full items-center justify-center rounded-xl border border-white/15 font-display text-sm">
              NX
            </div>
          </div>
          <div>
            <div className="font-display text-lg text-ink">Northstar Digital</div>
            <div className="text-xs uppercase tracking-[0.3em] text-steel">Build. Design. Scale.</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-steel hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink hover:border-ink/20 sm:inline-flex"
          >
            Sign in
          </Link>
          <a
            href="#contact"
            className="inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-panel"
          >
            Book discovery
          </a>
        </div>
      </div>
    </header>
  );
}
