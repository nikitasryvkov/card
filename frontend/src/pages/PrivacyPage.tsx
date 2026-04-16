import SiteFooter from "../components/navigation/SiteFooter";
import SiteHeader from "../components/navigation/SiteHeader";
import { businessInfo } from "../lib/business";

const sections = [
  {
    title: "1. Общие положения",
    body: `Настоящая политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта ${businessInfo.websiteUrl} оператором персональных данных ${businessInfo.shortName}.`,
  },
  {
    title: "2. Оператор персональных данных",
    body: `Оператор: ${businessInfo.fullName}, ИНН ${businessInfo.inn}, ОГРНИП ${businessInfo.ogrnip}, адрес: ${businessInfo.businessAddress}, email для обращений: ${businessInfo.personalData.operatorEmail}, телефон: ${businessInfo.personalData.operatorPhone}.`,
  },
  {
    title: "3. Какие данные могут обрабатываться",
    body: "Имя и фамилия, наименование компании, номер телефона, адрес электронной почты, содержание обращения, сведения для подготовки договоров и счетов, а также технические данные браузера, IP-адрес, служебные cookie и токены безопасности.",
  },
  {
    title: "4. Цели обработки",
    body: "Обработка входящих заявок, обратная связь с пользователем, подготовка коммерческих предложений, договоров, счетов и актов, исполнение обязательств по договору, обеспечение безопасности сайта и улучшение качества услуг.",
  },
  {
    title: "5. Правовые основания",
    body: "Согласие субъекта персональных данных, необходимость заключения и исполнения договора, а также иные основания, предусмотренные законодательством Российской Федерации.",
  },
  {
    title: "6. Локализация и место хранения",
    body: businessInfo.personalData.localizationNotice,
  },
  {
    title: "7. Передача третьим лицам",
    body: "Данные не передаются третьим лицам без законных оснований, за исключением случаев, когда такая передача необходима для исполнения договора, ведения бухгалтерского учета, обработки платежных документов, размещения сайта и корпоративной почты либо исполнения требований закона.",
  },
  {
    title: "8. Сроки хранения",
    body: "Персональные данные хранятся не дольше, чем этого требуют цели обработки, договорные обязательства и сроки, установленные законодательством Российской Федерации. Документы бухгалтерского и договорного учета хранятся в сроки, обязательные по закону.",
  },
  {
    title: "9. Права пользователя",
    body: "Пользователь вправе запросить уточнение, блокирование или удаление персональных данных, получить сведения об их обработке, а также отозвать согласие на обработку, направив обращение на указанный email.",
  },
  {
    title: "10. Меры защиты",
    body: "Оператор принимает разумные организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения. В текущей публичной версии сайта не используются рекламные, маркетинговые и аналитические cookie, а также пиксели внешних рекламных систем.",
  },
  {
    title: "11. Технические данные",
    body: "Сайт может обрабатывать только минимально необходимые технические данные браузера и сетевого запроса для корректной доставки страниц, защиты от злоупотреблений и работы инфраструктуры. Если в будущем на сайте будут подключены аналитические или рекламные инструменты, политика конфиденциальности будет обновлена отдельно.",
  },
  {
    title: "12. Контакты",
    body: `По вопросам обработки персональных данных можно обратиться по адресу ${businessInfo.personalData.operatorEmail} или по телефону ${businessInfo.personalData.operatorPhone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-ember sm:tracking-[0.35em]">
            Политика конфиденциальности
          </p>
          <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-5xl">
            Обработка персональных данных
          </h1>
          <p className="mt-4 break-words text-base leading-8 text-mist/75">
            Настоящая политика действует в отношении данных, которые пользователь передает через формы сайта,
            электронную почту и иные каналы связи при запросе услуг, консультации или дальнейшем
            взаимодействии с {businessInfo.shortName}.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur sm:p-6"
            >
              <h2 className="text-xl font-display leading-tight text-white sm:text-2xl">{section.title}</h2>
              <p className="mt-3 break-words text-sm leading-8 text-mist/75">{section.body}</p>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
