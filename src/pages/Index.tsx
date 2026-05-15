import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/8ba4584c-06d3-4070-96f9-cbe91b2e44b2/files/9b02b51f-3a72-47c3-89ea-2e9b7e10ac18.jpg";

const reviews = [
  {
    name: "Александр М.",
    text: "Заказывал трансфер в аэропорт в 4 утра. Водитель приехал вовремя, машина чистая, доехали быстро. Рекомендую!",
    rating: 5,
    date: "12 мая 2026",
  },
  {
    name: "Елена К.",
    text: "Пользуюсь каждый день на работу. Цены честные, водители вежливые. Наконец-то нормальное такси в нашем городе.",
    rating: 5,
    date: "8 мая 2026",
  },
  {
    name: "Дмитрий П.",
    text: "Ехал с детьми, попросил детское кресло — привезли без проблем. Очень внимательный сервис, спасибо!",
    rating: 5,
    date: "3 мая 2026",
  },
  {
    name: "Ольга В.",
    text: "Бизнес-класс на высоте. Чистый Mercedes, водитель в костюме, всё чётко и профессионально.",
    rating: 5,
    date: "29 апреля 2026",
  },
];

const features = [
  { icon: "Zap", label: "Подача за 5 минут", desc: "Машина у вашего подъезда" },
  { icon: "Shield", label: "Безопасность", desc: "Все водители проверены" },
  { icon: "Clock", label: "Работаем 24/7", desc: "День и ночь, без выходных" },
  { icon: "CreditCard", label: "Фиксированная цена", desc: "Никаких сюрпризов" },
];

function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-taxi-yellow to-transparent opacity-20"
          style={{
            top: `${15 + i * 14}%`,
            width: `${80 + i * 10}px`,
            animation: `speed-line ${1.5 + i * 0.4}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-taxi-yellow text-sm">★</span>
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [form, setForm] = useState({ from: "", to: "", name: "", phone: "" });
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const featuresSection = useInView();
  const reviewsSection = useInView();
  const contactSection = useInView();

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="bg-taxi-dark text-white font-golos min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-taxi-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-taxi-yellow rounded flex items-center justify-center">
            <Icon name="Car" size={18} className="text-taxi-dark" />
          </div>
          <span className="font-oswald text-xl font-semibold tracking-wide text-white">ТАКСИ<span className="text-taxi-yellow">ПРО</span></span>
        </div>
        <a
          href="tel:+79001234567"
          className="flex items-center gap-2 text-taxi-yellow font-oswald font-semibold text-lg tracking-wide hover:text-white transition-colors"
        >
          <Icon name="Phone" size={18} />
          +7 (900) 123-45-67
        </a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-taxi-dark via-taxi-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-taxi-dark via-transparent to-transparent" />
        <SpeedLines />

        <div className="absolute right-0 top-0 bottom-0 w-1 bg-taxi-yellow opacity-60" />
        <div
          className="absolute right-8 top-0 bottom-0 w-px bg-taxi-yellow opacity-20"
          style={{ transform: "skewX(-5deg)" }}
        />

        <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-taxi-yellow/10 border border-taxi-yellow/30 text-taxi-yellow text-sm font-medium px-4 py-1.5 rounded-full mb-6"
              style={{ animation: "fade-up 0.5s ease-out forwards", opacity: 0 }}
            >
              <span className="w-2 h-2 bg-taxi-yellow rounded-full animate-pulse" />
              Доступно сейчас · 5 минут подачи
            </div>

            <h1
              className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-4 uppercase"
              style={{ animation: "fade-up 0.6s 0.1s ease-out forwards", opacity: 0 }}
            >
              ЕДЕМ<br />
              <span className="text-taxi-yellow">БЫСТРО.</span><br />
              ЕДЕМ<br />
              <span className="relative">
                ВМЕСТЕ.
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-taxi-yellow" />
              </span>
            </h1>

            <p
              className="text-taxi-text text-lg mt-6 mb-10 max-w-md leading-relaxed"
              style={{ animation: "fade-up 0.6s 0.2s ease-out forwards", opacity: 0 }}
            >
              Надёжное такси в любое время суток. Опытные водители, чистые машины, честные цены.
            </p>

            {/* ORDER FORM */}
            <div
              className="bg-taxi-gray/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              style={{ animation: "fade-up 0.6s 0.3s ease-out forwards", opacity: 0 }}
            >
              <h2 className="font-oswald text-xl font-semibold mb-4 text-white tracking-wide">ЗАКАЗАТЬ ПОЕЗДКУ</h2>
              {!sent ? (
                <form onSubmit={handleOrder} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                      <input
                        type="text"
                        placeholder="Откуда"
                        className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                        value={form.from}
                        onChange={e => setForm({ ...form, from: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Icon name="Navigation" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                      <input
                        type="text"
                        placeholder="Куда"
                        className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                        value={form.to}
                        onChange={e => setForm({ ...form, to: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Icon name="Phone" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                      <input
                        type="tel"
                        placeholder="Телефон"
                        className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-taxi-yellow text-taxi-dark font-oswald font-bold text-lg py-4 rounded-xl hover:bg-yellow-400 transition-all duration-200 tracking-wide uppercase animate-pulse-yellow"
                  >
                    Заказать такси →
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-taxi-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-taxi-yellow" />
                  </div>
                  <p className="font-oswald text-xl font-semibold text-white">Заявка принята!</p>
                  <p className="text-taxi-text mt-2 text-sm">Перезвоним в течение 2 минут</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresSection.ref} className="py-20 bg-taxi-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.label}
                className="group text-center p-6 rounded-2xl border border-white/5 bg-taxi-gray hover:border-taxi-yellow/30 hover:bg-taxi-muted transition-all duration-300 cursor-default"
                style={{
                  opacity: featuresSection.inView ? 1 : 0,
                  transform: featuresSection.inView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div className="w-12 h-12 bg-taxi-yellow/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-taxi-yellow/20 transition-colors">
                  <Icon name={f.icon} size={24} className="text-taxi-yellow" />
                </div>
                <p className="font-oswald font-semibold text-white text-lg tracking-wide">{f.label}</p>
                <p className="text-taxi-text text-sm mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-16">
            {[
              { num: "5 000+", label: "Поездок в месяц" },
              { num: "4.9", label: "Средняя оценка" },
              { num: "24/7", label: "Работаем всегда" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="text-center"
                style={{
                  opacity: featuresSection.inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.4 + i * 0.1}s`,
                }}
              >
                <div className="font-oswald text-5xl md:text-6xl font-bold text-taxi-yellow">{s.num}</div>
                <div className="text-taxi-text mt-2 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section ref={reviewsSection.ref} className="py-20 bg-taxi-gray">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-taxi-yellow font-oswald text-sm tracking-widest uppercase mb-2">Отзывы клиентов</p>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase">Нам доверяют</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-taxi-text">
              <span className="text-taxi-yellow text-2xl font-oswald font-bold">★ 4.9</span>
              <span className="text-sm">/ 5.0 средняя оценка</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className="bg-taxi-dark rounded-2xl p-6 border border-white/5 hover:border-taxi-yellow/20 transition-all duration-300"
                style={{
                  opacity: reviewsSection.inView ? 1 : 0,
                  transform: reviewsSection.inView ? "translateY(0)" : "translateY(25px)",
                  transition: `all 0.5s ease ${i * 0.12}s`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-taxi-yellow/10 rounded-full flex items-center justify-center">
                      <span className="font-oswald font-bold text-taxi-yellow">{r.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{r.name}</p>
                      <p className="text-taxi-text text-xs">{r.date}</p>
                    </div>
                  </div>
                  <StarRating count={r.rating} />
                </div>
                <p className="text-taxi-text leading-relaxed text-sm">«{r.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section ref={contactSection.ref} className="py-20 bg-taxi-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div
              style={{
                opacity: contactSection.inView ? 1 : 0,
                transform: contactSection.inView ? "translateX(0)" : "translateX(-30px)",
                transition: "all 0.6s ease",
              }}
            >
              <p className="text-taxi-yellow font-oswald text-sm tracking-widest uppercase mb-2">Свяжитесь с нами</p>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase mb-8">Контакты</h2>

              <div className="space-y-5">
                <a
                  href="tel:+79001234567"
                  className="flex items-center gap-4 p-5 bg-taxi-gray rounded-2xl border border-white/5 hover:border-taxi-yellow/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-taxi-yellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Phone" size={22} className="text-taxi-dark" />
                  </div>
                  <div>
                    <p className="text-taxi-text text-xs mb-0.5">Телефон</p>
                    <p className="font-oswald font-semibold text-xl text-white">+7 (900) 123-45-67</p>
                  </div>
                </a>

                <a
                  href="https://t.me/taksipro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-taxi-gray rounded-2xl border border-white/5 hover:border-[#2AABEE]/40 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#2AABEE] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Send" size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-taxi-text text-xs mb-0.5">Telegram</p>
                    <p className="font-oswald font-semibold text-xl text-white">@taksipro</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-taxi-gray rounded-2xl border border-white/5">
                  <div className="w-12 h-12 bg-taxi-yellow/10 rounded-xl flex items-center justify-center">
                    <Icon name="Clock" size={22} className="text-taxi-yellow" />
                  </div>
                  <div>
                    <p className="text-taxi-text text-xs mb-0.5">Режим работы</p>
                    <p className="font-oswald font-semibold text-xl text-white">Круглосуточно 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-taxi-gray rounded-2xl p-8 border border-white/5"
              style={{
                opacity: contactSection.inView ? 1 : 0,
                transform: contactSection.inView ? "translateX(0)" : "translateX(30px)",
                transition: "all 0.6s ease 0.15s",
              }}
            >
              <h3 className="font-oswald text-2xl font-semibold text-white mb-6 tracking-wide">ОБРАТНАЯ СВЯЗЬ</h3>
              {!contactSent ? (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="relative">
                    <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Icon name="Phone" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-taxi-yellow" />
                    <input
                      type="tel"
                      placeholder="Телефон"
                      className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Icon name="MessageSquare" size={16} className="absolute left-3 top-3.5 text-taxi-yellow" />
                    <textarea
                      placeholder="Ваш вопрос или комментарий"
                      rows={4}
                      className="w-full bg-taxi-muted border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder-taxi-text focus:outline-none focus:border-taxi-yellow/50 transition-colors text-sm resize-none"
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-taxi-yellow text-taxi-dark font-oswald font-bold text-lg py-4 rounded-xl hover:bg-yellow-400 transition-all duration-200 tracking-wide uppercase"
                  >
                    Отправить сообщение →
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-taxi-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-taxi-yellow" />
                  </div>
                  <p className="font-oswald text-xl font-semibold text-white">Сообщение отправлено!</p>
                  <p className="text-taxi-text mt-2 text-sm">Свяжемся с вами в ближайшее время</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 bg-taxi-dark">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-taxi-yellow rounded flex items-center justify-center">
              <Icon name="Car" size={14} className="text-taxi-dark" />
            </div>
            <span className="font-oswald text-base font-semibold text-white">ТАКСИ<span className="text-taxi-yellow">ПРО</span></span>
          </div>
          <p className="text-taxi-text text-sm">© 2026 ТаксиПро. Все права защищены.</p>
          <a href="tel:+79001234567" className="text-taxi-yellow font-oswald font-semibold hover:text-white transition-colors">
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>
    </div>
  );
}