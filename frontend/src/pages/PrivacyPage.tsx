import SiteHeader from "../components/navigation/SiteHeader";
import SiteFooter from "../components/navigation/SiteFooter";
import { businessInfo } from "../lib/business";

const sections = [
  {
    title: "1. Общие положения",
    body: `Настоящая политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта оператором персональных данных ${businessInfo.shortName}.`,
  },
  {
    title: "2. Оператор персональных данных",
    body: `Оператор: ${businessInfo.fullName}, ИНН ${businessInfo.inn}, ОГРНИП ${businessInfo.ogrnip}, адрес: ${businessInfo.businessAddress}, email для обращений: ${businessInfo.contacts.email}.`,
  },
  {
    title: "3. Какие данные обрабатываются",
    body: "Имя, номер телефона, адрес электронной почты, текст обращения, а также технические данные, которые могут передаваться браузером пользователя при посещении сайта.",
  },
  {
    title: "4. Цели обработки",
    body: "Обработка заявок, обратная связь с пользователем, подготовка договоров и коммерческих предложений, сопровождение исполнения обязательств и улучшение качества оказываемых услуг.",
  },
  {
    title: "5. Правовые основания",
    body: "Согласие субъекта персональных данных, необходимость заключения и исполнения договора, а также иные основания, предусмотренные законодательством Российской Федерации.",
  },
  {
    title: "6. Сроки хранения",
    body: "Персональные данные хранятся не дольше, чем этого требуют цели обработки, либо сроки, установленные законодательством РФ и договорными обязательствами.",
  },
  {
    title: "7. Передача данных третьим лицам",
    body: "Данные не передаются третьим лицам без законных оснований, за исключением случаев, когда такая передача необходима для исполнения договора, требований закона или обработки обращения пользователя.",
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
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-panel">
          <p className="text-xs uppercase tracking-[0.35em] text-ember">Политика конфиденциальности</p>
          <h1 className="mt-4 text-5xl font-display">Обработка персональных данных</h1>
          <p className="mt-4 text-base leading-8 text-steel">
            Настоящая политика действует в отношении данных, которые пользователь передает через формы сайта,
            электронную почту и иные каналы связи в рамках запроса услуг, консультации или дальнейшего взаимодействия.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-panel">
              <h2 className="text-2xl font-display">{section.title}</h2>
              <p className="mt-3 text-sm leading-8 text-steel">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
