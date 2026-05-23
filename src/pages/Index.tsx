import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO_IMG = "https://cdn.poehali.dev/projects/8ba4584c-06d3-4070-96f9-cbe91b2e44b2/files/00a23ff4-a06c-4e92-a6c3-60b2e9386c87.jpg";
const HERO_IMG = "https://cdn.poehali.dev/projects/8ba4584c-06d3-4070-96f9-cbe91b2e44b2/files/2a308180-7155-40e5-b5b6-65209566764a.jpg";
const PHONE = "89278978722";
const PHONE_DISPLAY = "+7 (927) 897-87-22";
const TG = "@Aricha46";
const TG_URL = "https://t.me/Aricha46";
const MAX_URL = "https://max.ru/u/f9LHodD0cOJRttLGXmrsjygaiyV3x1j_lfFDYl57If4t7FEbbsMKkVmh68E";
const MAX_LOGO = "https://cdn.poehali.dev/projects/8ba4584c-06d3-4070-96f9-cbe91b2e44b2/bucket/5690f815-4254-4066-89c1-aab6e13ce23a.png";

const reviews = [
  {
    name: "Максим Т.",
    city: "Самара → Москва",
    text: "Ехали с семьёй из Самары в Москву. Водитель приехал минута в минуту, машина чистая, кондиционер работал. Дорога прошла спокойно, без нервов. Буду заказывать снова!",
    rating: 5,
    date: "Май 2026",
  },
  {
    name: "Анастасия В.",
    city: "Ростов → Мариуполь",
    text: "Возили маму к родственникам на новые территории. Другие отказывались, а Поехали взялись без лишних вопросов. Доехали отлично, водитель опытный, знает дорогу.",
    rating: 5,
    date: "Апрель 2026",
  },
  {
    name: "Игорь С.",
    city: "Казань → Уфа",
    text: "Регулярно езжу по работе. Пользуюсь уже 2 года. Цена честная, договариваемся заранее — никаких сюрпризов в дороге. Рекомендую всем, кто ценит время.",
    rating: 5,
    date: "Май 2026",
  },
  {
    name: "Светлана М.",
    city: "Краснодар → Луганск",
    text: "Спасибо большое! Ехала с ребёнком, всё организовали чётко: детское кресло, остановки по пути. Чувствовала себя в безопасности на протяжении всей дороги.",
    rating: 5,
    date: "Март 2026",
  },
  {
    name: "Денис К.",
    city: "Волгоград → Донецк",
    text: "Работаю вахтой, езжу каждые два месяца. Поехали — единственные, кто стабильно возит туда. Водители знают маршрут, всё чётко и без проблем.",
    rating: 5,
    date: "Апрель 2026",
  },
  {
    name: "Ольга Р.",
    city: "Нижний Новгород → Пенза",
    text: "Заказывала первый раз, немного переживала. Но всё прошло идеально — связь хорошая, отвечают быстро, водитель культурный. Уже посоветовала подругам.",
    rating: 5,
    date: "Май 2026",
  },
];

const features = [
  { icon: "MapPin", label: "По всей России", desc: "Любой город, любой регион" },
  { icon: "Flag", label: "Новые территории", desc: "ДНР, ЛНР, Запорожье, Херсон" },
  { icon: "Shield", label: "Работаем с 2018", desc: "8 лет надёжных поездок" },
  { icon: "Clock", label: "24/7", desc: "В любое время суток" },
  { icon: "Users", label: "Группы и семьи", desc: "Вместительные авто" },
  { icon: "CreditCard", label: "Фиксированная цена", desc: "Без сюрпризов в дороге" },
];

const routes = [
  "Самара ↔ Москва", "Ростов ↔ Донецк", "Краснодар ↔ Луганск",
  "Казань ↔ Уфа", "Волгоград ↔ Запорожье", "Саратов ↔ Херсон",
  "Нижний Новгород ↔ Москва", "Воронеж ↔ Мариуполь",
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-base">★</span>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Index() {
  const [form, setForm] = useState({ from: "", to: "", name: "", phone: "" });
  const [sent, setSent] = useState(false);

  const featuresSection = useInView();
  const routesSection = useInView();
  const reviewsSection = useInView();
  const contactSection = useInView();

  const handleOrder = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <div className="bg-[#0B0F1A] text-white font-golos min-h-screen overflow-x-hidden">
        {/* ── NAV ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-yellow-400/30">
              <img src={LOGO_IMG} alt="Поехали" className="w-full h-full object-cover" fetchPriority="high" />
            </div>
            <span className="font-oswald text-xl font-bold tracking-widest text-white uppercase">
              ПОЕ<span className="text-yellow-400">ХАЛИ</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#2AABEE]/20 hover:bg-[#2AABEE]/30 text-[#2AABEE] px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <Icon name="Send" size={15} />
              {TG}
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#0B0F1A] px-4 py-2 rounded-xl font-oswald font-bold text-sm tracking-wide transition-colors"
            >
              <Icon name="Phone" size={15} />
              <span className="hidden md:inline">{PHONE_DISPLAY}</span>
              <span className="md:hidden">Позвонить</span>
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <img
            src={HERO_IMG}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/90 to-[#0B0F1A]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />

          {/* animated road lines — desktop only */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-15"
                style={{
                  height: "1px",
                  width: `${60 + i * 25}px`,
                  top: `${25 + i * 13}%`,
                  animation: `speed-line ${1.8 + i * 0.5}s linear infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full px-4 md:px-6 pt-24 pb-10">
            <div className="max-w-xl mx-auto md:mx-0">
              <div
                className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest"
                style={{ animation: "fade-up 0.5s ease-out forwards", opacity: 0 }}
              >
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                С 2018 года · По всей России
              </div>

              <div
                className="inline-block bg-yellow-400 text-[#0B0F1A] font-oswald font-bold text-sm md:text-base px-4 py-2 rounded-xl mb-4 uppercase tracking-wide"
                style={{ animation: "fade-up 0.5s 0.05s ease-out forwards", opacity: 0 }}
              >
                Закажите междугороднее такси
              </div>

              <h1
                className="font-oswald uppercase leading-tight mb-4"
                style={{ animation: "fade-up 0.6s 0.1s ease-out forwards", opacity: 0, fontSize: "clamp(2.4rem, 8vw, 5rem)", fontWeight: 700 }}
              >
                Такси<br />
                <span className="text-yellow-400">Поехали</span><br />
                <span style={{ fontSize: "clamp(1.4rem, 5vw, 2.5rem)" }} className="font-semibold text-slate-300">в другой город</span>
              </h1>

              <p
                className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 max-w-md"
                style={{ animation: "fade-up 0.6s 0.2s ease-out forwards", opacity: 0 }}
              >
                Межгородские перевозки по всей России и новым территориям. Удобно, безопасно, по фиксированной цене.
              </p>

              {/* ORDER FORM */}
              <div
                className="bg-[#131929]/98 backdrop-blur-sm border border-white/8 rounded-2xl p-4 md:p-6"
                style={{ animation: "fade-up 0.6s 0.3s ease-out forwards", opacity: 0 }}
              >
                <p className="font-oswald text-base font-semibold tracking-wide text-white mb-4 uppercase">Рассчитать поездку</p>
                {!sent ? (
                  <form onSubmit={handleOrder} className="space-y-3">
                    <div className="relative">
                      <Icon name="MapPin" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                      <input type="text" placeholder="Откуда (город)" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/40 text-sm transition-colors"
                        value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} />
                    </div>
                    <div className="relative">
                      <Icon name="Navigation" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                      <input type="text" placeholder="Куда (город)" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/40 text-sm transition-colors"
                        value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} />
                    </div>
                    <div className="relative">
                      <Icon name="User" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                      <input type="text" placeholder="Ваше имя" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/40 text-sm transition-colors"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="relative">
                      <Icon name="Phone" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                      <input type="tel" placeholder="Телефон" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/40 text-sm transition-colors"
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <button type="submit"
                      className="w-full bg-yellow-400 text-[#0B0F1A] font-oswald font-bold text-base py-4 rounded-xl hover:bg-yellow-300 active:scale-[0.98] transition-all tracking-wide uppercase">
                      Узнать стоимость →
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-yellow-400/15 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="CheckCircle" size={28} className="text-yellow-400" />
                    </div>
                    <p className="font-oswald text-lg font-semibold text-white">Заявка принята!</p>
                    <p className="text-slate-400 mt-1 text-sm">Перезвоним в течение нескольких минут</p>
                  </div>
                )}
              </div>

              {/* quick contact */}
              <div
                className="flex flex-wrap gap-4 mt-4"
                style={{ animation: "fade-up 0.6s 0.4s ease-out forwards", opacity: 0 }}
              >
                <a href={`tel:${PHONE}`}
                  className="flex items-center gap-2 text-yellow-400 font-medium text-sm hover:text-yellow-300 transition-colors">
                  <Icon name="Phone" size={14} /> {PHONE_DISPLAY}
                </a>
                <a href={TG_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2AABEE] text-sm hover:text-blue-300 transition-colors">
                  <Icon name="Send" size={14} /> {TG}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section ref={featuresSection.ref} className="py-14 md:py-20 bg-[#0B0F1A]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <p className="text-yellow-400 font-oswald text-xs tracking-widest uppercase mb-2">Почему выбирают нас</p>
              <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase text-white">Наши преимущества</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {features.map((f, i) => (
                <div
                  key={f.label}
                  className="group p-5 rounded-2xl bg-[#131929] border border-white/5 hover:border-yellow-400/25 transition-all duration-300"
                  style={{
                    opacity: featuresSection.inView ? 1 : 0,
                    transform: featuresSection.inView ? "translateY(0)" : "translateY(25px)",
                    transition: `all 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-yellow-400/20 transition-colors">
                    <Icon name={f.icon} size={20} className="text-yellow-400" />
                  </div>
                  <p className="font-oswald font-semibold text-white text-base tracking-wide">{f.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
              {[
                { num: "8 лет", label: "на рынке с 2018 года" },
                { num: "15 000+", label: "поездок выполнено" },
                { num: "4.9★", label: "средняя оценка" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="text-center"
                  style={{
                    opacity: featuresSection.inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${0.5 + i * 0.1}s`,
                  }}
                >
                  <div className="font-oswald text-2xl md:text-5xl font-bold text-yellow-400">{s.num}</div>
                  <div className="text-slate-500 mt-1 text-xs md:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROUTES ── */}
        <section ref={routesSection.ref} className="py-12 md:py-16 bg-[#0D1220]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-yellow-400 font-oswald text-xs tracking-widest uppercase mb-2">Маршруты</p>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-white">Популярные направления</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {routes.map((r, i) => (
                <div
                  key={r}
                  className="flex items-center gap-2 bg-[#131929] border border-white/8 hover:border-yellow-400/30 rounded-xl px-4 py-2.5 text-sm text-slate-300 hover:text-yellow-400 transition-all cursor-default"
                  style={{
                    opacity: routesSection.inView ? 1 : 0,
                    transform: routesSection.inView ? "scale(1)" : "scale(0.9)",
                    transition: `all 0.4s ease ${i * 0.06}s`,
                  }}
                >
                  <Icon name="ArrowLeftRight" size={13} className="text-yellow-400/60" />
                  {r}
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-6">
              Не нашли нужный маршрут? <a href={`tel:${PHONE}`} className="text-yellow-400 hover:underline">Позвоните нам</a> — поедем куда угодно
            </p>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section ref={reviewsSection.ref} className="py-14 md:py-20 bg-[#0B0F1A]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-yellow-400 font-oswald text-xs tracking-widest uppercase mb-2">Отзывы</p>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">Нам доверяют</h2>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-yellow-400 text-3xl font-oswald font-bold">4.9</span>
                <div>
                  <StarRating count={5} />
                  <span className="text-xs">из 5 · 200+ отзывов</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((r, i) => (
                <div
                  key={r.name}
                  className="bg-[#131929] rounded-2xl p-5 border border-white/5 hover:border-yellow-400/15 transition-all duration-300 flex flex-col gap-4"
                  style={{
                    opacity: reviewsSection.inView ? 1 : 0,
                    transform: reviewsSection.inView ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-yellow-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-oswald font-bold text-yellow-400 text-sm">{r.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{r.name}</p>
                        <p className="text-yellow-400/70 text-xs">{r.city}</p>
                      </div>
                    </div>
                    <StarRating count={r.rating} />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">«{r.text}»</p>
                  <p className="text-slate-600 text-xs mt-auto">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACTS ── */}
        <section ref={contactSection.ref} className="py-16 bg-[#0D1220]">
          <div className="container mx-auto px-4 md:px-6">
            <div
              style={{
                opacity: contactSection.inView ? 1 : 0,
                transform: contactSection.inView ? "translateY(0)" : "translateY(25px)",
                transition: "all 0.6s ease",
              }}
            >
              <div className="text-center mb-10">
                <p className="text-yellow-400 font-oswald text-xs tracking-widest uppercase mb-2">Связаться</p>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">Контакты</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a href={`tel:${PHONE}`}
                  className="flex items-center gap-4 p-5 bg-[#131929] rounded-2xl border border-white/5 hover:border-yellow-400/30 active:scale-[0.98] group transition-all">
                  <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon name="Phone" size={26} className="text-[#0B0F1A]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Позвонить</p>
                    <p className="font-oswald font-semibold text-lg text-white leading-tight">{PHONE_DISPLAY}</p>
                    <p className="text-slate-500 text-xs mt-0.5">Круглосуточно</p>
                  </div>
                </a>

                <a href={TG_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-[#131929] rounded-2xl border border-white/5 hover:border-[#2AABEE]/30 active:scale-[0.98] group transition-all">
                  <div className="w-14 h-14 bg-[#2AABEE] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon name="Send" size={26} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Написать</p>
                    <p className="font-oswald font-semibold text-lg text-white leading-tight">{TG}</p>
                    <p className="text-slate-500 text-xs mt-0.5">Telegram</p>
                  </div>
                </a>

                <a href={MAX_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-[#131929] rounded-2xl border border-white/5 hover:border-purple-500/30 active:scale-[0.98] group transition-all">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                    <img src={MAX_LOGO} alt="Макс" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Написать</p>
                    <p className="font-oswald font-semibold text-lg text-white leading-tight">Макс</p>
                    <p className="text-slate-500 text-xs mt-0.5">Мессенджер Макс</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-[#131929] rounded-2xl border border-white/5 sm:col-span-2">
                  <div className="w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={26} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Режим работы</p>
                    <p className="font-oswald font-semibold text-lg text-white">Круглосуточно, без выходных</p>
                    <p className="text-slate-500 text-xs mt-0.5">Вся Россия + Новые территории</p>
                  </div>
                </div>
              </div>

              {/* big CTA buttons mobile-friendly */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-6">
                <a href={`tel:${PHONE}`}
                  className="flex-1 flex items-center justify-center gap-3 bg-yellow-400 text-[#0B0F1A] font-oswald font-bold text-lg py-4 rounded-2xl hover:bg-yellow-300 active:scale-[0.98] transition-all tracking-wide uppercase">
                  <Icon name="Phone" size={20} />
                  Позвонить сейчас
                </a>
                <a href={TG_URL} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#2AABEE] text-white font-oswald font-bold text-lg py-4 rounded-2xl hover:bg-blue-400 active:scale-[0.98] transition-all tracking-wide uppercase">
                  <Icon name="Send" size={20} />
                  Telegram
                </a>
                <a href={MAX_URL} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-white/10 text-white font-oswald font-bold text-lg py-4 rounded-2xl hover:bg-white/15 active:scale-[0.98] transition-all tracking-wide uppercase border border-white/10">
                  <img src={MAX_LOGO} alt="Макс" className="w-6 h-6 rounded-md" />
                  Макс
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FLOATING CALL BUTTON (mobile) ── */}
        <div className="fixed bottom-5 left-4 right-4 z-40 flex gap-3 md:hidden">
          <a href={`tel:${PHONE}`}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-[#0B0F1A] font-oswald font-bold text-base py-4 rounded-2xl shadow-lg shadow-yellow-400/20 active:scale-95 transition-all">
            <Icon name="Phone" size={20} />
            Позвонить
          </a>
          <a href={TG_URL} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2AABEE] text-white font-oswald font-bold text-base py-4 rounded-2xl shadow-lg shadow-blue-400/20 active:scale-95 transition-all">
            <Icon name="Send" size={20} />
            Telegram
          </a>
        </div>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 py-8 pb-28 md:pb-8 bg-[#0B0F1A]">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden">
                <img src={LOGO_IMG} alt="Поехали" className="w-full h-full object-cover" />
              </div>
              <span className="font-oswald font-bold text-white tracking-widest">ПОЕ<span className="text-yellow-400">ХАЛИ</span></span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">Межгород с 2018</span>
            </div>
            <p className="text-slate-600">© 2026 Такси Поехали. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href={`tel:${PHONE}`} className="text-yellow-400 hover:text-yellow-300 font-oswald font-semibold transition-colors">{PHONE_DISPLAY}</a>
              <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="text-[#2AABEE] hover:text-blue-300 transition-colors">{TG}</a>
              <a href={MAX_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
                <img src={MAX_LOGO} alt="Макс" className="w-5 h-5 rounded" />
                Макс
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}