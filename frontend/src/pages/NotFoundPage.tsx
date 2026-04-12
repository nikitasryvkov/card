import { Link, useNavigate } from "react-router-dom";
import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";

export default function NotFoundPage() {
  const navigate = useNavigate();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto flex min-h-[calc(100vh-220px)] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">404</p>
          <h1 className="mt-4 text-4xl font-display leading-tight text-white sm:text-5xl">Страница не найдена.</h1>
          <p className="mt-5 text-base leading-8 text-mist/75">
            Возможно, ссылка устарела или адрес введен с ошибкой. Вернитесь назад или откройте главную страницу
            и перейдите в нужный раздел через основное меню сайта.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Назад
            </button>
            <Link
              to="/"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              На главную
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
