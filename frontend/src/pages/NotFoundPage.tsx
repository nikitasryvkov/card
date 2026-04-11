import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center text-white">
      <div className="w-full rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur">
        <p className="text-xs uppercase tracking-[0.35em] text-ember">404</p>
        <h1 className="mt-4 text-5xl font-display text-white">Страница не найдена.</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-mist/75">
          Возможно, ссылка устарела или адрес введен с ошибкой. Вернитесь на главную страницу и выберите
          нужный раздел из основного меню сайта.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">
          На главную
        </Link>
      </div>
    </main>
  );
}
