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
    body: `Оператор: ${businessInfo.fullName}, ИНН ${businessInfo.inn}, ОГРНИП ${businessInfo.ogrnip}, адрес: ${businessInfo.businessAddress}, email для обращений: ${businessInfo.contacts.email}.`,
  },
  {
    title: "3. Какие данные могут обрабатываться",
    body: "Имя, номер телефона, адрес электронной почты, содержание обращения, реквизиты для подготовки договоров и счетов, а также технические данные, которые браузер пользователя передает при посещении сайта.",
  },
  {
    title: "4. Цели обработки",
    body: "Обработка входящих заявок, обратная связь с пользователем, подготовка коммерческих предложений, договоров и счетов, исполнение обязательств по договору, а также повышение качества сайта и оказываемых услуг.",
  },
  {
    title: "5. Правовые основания",
    body: "Согласие субъекта персональных данных, необходимость заключения и исполнения договора, а также иные основания, предусмотренные законодательством Российской Федерации.",
  },
  {
    title: "6. Сроки хранения",
    body: "Персональные данные хранятся не дольше, чем этого требуют цели обработки, договорные обязательства и сроки, установленные законодательством Российской Федерации.",
  },
  {
    title: "7. Передача третьим лицам",
    body: "Данные не передаются третьим лицам без законных оснований, за исключением случаев, когда такая передача необходима для исполнения договора, ведения бухгалтерского учета, обработки платежных документов или исполнения требований закона.",
  },
  {
    title: "8. Права пользователя",
    body: "Пользователь вправе запросить уточнение, блокирование или удаление персональных данных, а также отозвать согласие на их обработку, направив обращение на указанный email.",
  },
  {
    title: "9. Меры защиты",
    body: "Оператор принимает разумные организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.",
  },
  {
    title: "10. Контакты",
    body: `По вопросам обработки персональных данных можно обратиться по адресу ${businessInfo.contacts.email} или по телефону ${businessInfo.contacts.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-ember sm:tracking-[0.35em]">Политика конфиденциальности</p>
          <h1 className="mt-4 text-3xl font-display leading-tight text-white sm:text-5xl">
            Обработка персональных данных
          </h1>
          <p className="mt-4 break-words text-base leading-8 text-mist/75">
            Настоящая политика действует в отношении данных, которые пользователь передает через формы сайта,
            электронную почту и иные каналы связи при запросе услуг, консультации или дальнейшего взаимодействия.
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
