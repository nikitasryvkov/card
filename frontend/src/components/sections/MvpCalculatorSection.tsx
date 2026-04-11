import { useState } from "react";

const calculatorOptions = [
  { id: "account", label: "Личный кабинет пользователя", price: 70000, weeks: 1 },
  { id: "payments", label: "Интеграция платежей", price: 60000, weeks: 1 },
  { id: "mobile", label: "Расширенный мобильный сценарий", price: 30000, weeks: 1 },
  { id: "admin", label: "Админ-панель и роли доступа", price: 50000, weeks: 1 },
  { id: "integrations", label: "Интеграции с внешними API", price: 50000, weeks: 1 },
  { id: "ai", label: "AI-автоматизация внутри продукта", price: 80000, weeks: 2 },
] as const;

const basePrice = 220000;
const baseWeeks = 3;

export default function MvpCalculatorSection() {
  const [selected, setSelected] = useState<string[]>(["account", "admin"]);

  const selectedOptions = calculatorOptions.filter((option) => selected.includes(option.id));
  const extraPrice = selectedOptions.reduce((sum, option) => sum + option.price, 0);
  const extraWeeks = selectedOptions.reduce((sum, option) => sum + option.weeks, 0);
  const total = basePrice + extraPrice;
  const minPrice = Math.round(total * 0.92);
  const maxPrice = Math.round(total * 1.12);
  const timeline = `${baseWeeks + Math.max(0, extraWeeks - 1)}–${baseWeeks + extraWeeks + 1} недель`;

  const packageLabel =
    total >= 430000 ? "Платформенный MVP" : total >= 320000 ? "Расширенный MVP" : "Базовый MVP";

  function toggleOption(optionId: string) {
    setSelected((current) => (current.includes(optionId) ? current.filter((item) => item !== optionId) : [...current, optionId]));
  }

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#0d1d2b] shadow-panel">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-aqua">Калькулятор стоимости MVP</p>
            <h2 className="mt-4 text-4xl font-display text-white">Помогает быстро понять порядок бюджета до discovery-сессии</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-mist/75">
              Это не публичный прайс-лист, а ориентир для первой консультации. После аналитики смета уточняется по
              ролям, интеграциям, рискам и требованиям к безопасности.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {calculatorOptions.map((option) => {
                const isSelected = selected.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(option.id)}
                    className={`rounded-[24px] border px-5 py-5 text-left transition ${
                      isSelected
                        ? "border-aqua/60 bg-aqua/10 text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-white/25"
                    }`}
                  >
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">+ от {formatCurrency(option.price)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-amber-200">Предварительная оценка</div>
              <div className="mt-4 text-4xl font-display text-white">
                {formatCurrency(minPrice)} — {formatCurrency(maxPrice)}
              </div>
              <p className="mt-4 text-sm leading-7 text-mist/75">
                Формат: <span className="font-semibold text-white">{packageLabel}</span>
                <br />
                Ориентировочный срок: <span className="font-semibold text-white">{timeline}</span>
              </p>
            </div>

            <div className="mt-6 rounded-[32px] border border-white/10 bg-[#102435] p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-aqua/80">Что входит в расчет</div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/80">
                <li>Архитектурная проработка и декомпозиция MVP</li>
                <li>Backend и frontend на production-ready стеке</li>
                <li>Адаптивный интерфейс и базовый релизный контур</li>
                <li>Подготовка к масштабированию и дальнейшим итерациям</li>
              </ul>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Запросить точную смету
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}
