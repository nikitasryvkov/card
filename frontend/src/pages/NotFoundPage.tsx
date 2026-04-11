import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-ember">404</p>
      <h1 className="mt-4 text-5xl font-display">That route is not part of the current delivery scope.</h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-steel">
        The boilerplate includes public pages, a client dashboard, and an admin shell. Additional modules can be layered in without changing the route foundation.
      </p>
      <Link to="/" className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
        Return home
      </Link>
    </div>
  );
}
