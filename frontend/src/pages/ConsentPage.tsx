import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import { businessInfo } from "../lib/business";

const sections = [
  {
    title: "1. Общие положения",
    paragraphs: [
      `Настоящее согласие на обработку персональных данных дается ${businessInfo.fullName}, ИНН ${businessInfo.inn}, ОГРНИП ${businessInfo.ogrnip}, как оператору персональных данных.`,
      `Согласие действует в отношении данных, которые пользователь передает через сайт ${businessInfo.websiteUrl}, электронную почту, форму заявки и иные согласованные каналы связи.`,
    ],
  },
  {
    title: "2. Какие данные могут обрабатываться",
    paragraphs: [
      "Фамилия, имя, отчество, адрес электронной почты, номер телефона, наименование компании, содержание обращения, сведения для подготовки договора, счета и иных деловых документов.",
      "При использовании сайта также могут обрабатываться технические данные, необходимые для стабильной работы и защиты сервиса: IP-адрес, user-agent, сведения о браузере и устройстве, служебные cookie и токены сессии и безопасности.",
    ],
  },
  {
    title: "3. Цели обработки",
    paragraphs: [
      "Обратная связь по заявке, подготовка коммерческих предложений, договоров, счетов и актов, заключение и исполнение договора, ведение деловой переписки и защита сайта от злоупотреблений.",
    ],
  },
  {
    title: "4. Действия с данными",
    paragraphs: [
      "Сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, передача в случаях, предусмотренных законом или договором, обезличивание, блокирование, удаление и уничтожение.",
    ],
  },
  {
    title: "5. Способы обработки и хранение",
    paragraphs: [
      "Обработка может осуществляться как с использованием средств автоматизации, так и без их использования, если это необходимо для исполнения обязательств и ведения документов.",
      businessInfo.personalData.localizationNotice,
    ],
  },
  {
    title: "6. Передача третьим лицам",
    paragraphs: [
      "Данные могут передаваться только при наличии законного основания или необходимости исполнения договора: банку для обработки платежных документов, бухгалтерским и хостинг-сервисам, почтовым и коммуникационным провайдерам, а также государственным органам в случаях, предусмотренных законом.",
    ],
  },
  {
    title: "7. Срок действия согласия",
    paragraphs: [
      "Согласие действует до достижения целей обработки либо до его отзыва субъектом персональных данных, если иное не требуется для хранения документов и исполнения обязанностей, установленных законодательством Российской Федерации.",
    ],
  },
  {
    title: "8. Отзыв согласия",
    paragraphs: [
      `Согласие может быть отозвано путем направления обращения на ${businessInfo.personalData.operatorEmail}. Отзыв согласия не влияет на законность обработки, осуществленной до момента его получения оператором.`,
    ],
  },
];

export default function ConsentPage() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-ember sm:tracking-[0.35em]">
            Согласие на обработку персональных данных
          </p>
          <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-5xl">
            Согласие пользователя сайта
          </h1>
          <p className="mt-4 break-words text-base leading-8 text-mist/75">
            Документ определяет условия, на которых пользователь дает согласие на обработку персональных
            данных при заполнении формы заявки, переписке по проекту и ином взаимодействии с{" "}
            {businessInfo.shortName}.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur sm:p-6"
            >
              <h2 className="text-xl font-display leading-tight text-white sm:text-2xl">{section.title}</h2>
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="break-words text-sm leading-8 text-mist/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
