"use client";
import { useEffect, useState } from "react";
import brand from "@/content/brand.json";

type Lang = "ar" | "en";
type T = { ar: string; en: string };
type Product = { name: T; text: T; price: string; image: string };

const products = brand.products as Product[];
const gallery = brand.gallery as string[];

const UI = {
  about: { ar: "من نحن", en: "About" },
  products: { ar: "منتجاتنا", en: "Our Products" },
  gallery: { ar: "معرض الصور", en: "Gallery" },
  contact: { ar: "تواصل معنا", en: "Contact Us" },
  order: { ar: "احجز استشارة", en: "Book a Consultation" },
  whatsapp: { ar: "راسلنا على واتساب", en: "Chat on WhatsApp" },
  call: { ar: "اتصل بنا", en: "Call Us" },
  hours: { ar: "مواعيد العمل", en: "Working Hours" },
  address: { ar: "العنوان", en: "Address" },
  follow: { ar: "تابعنا", en: "Follow Us" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
};

const waLink = (n: string, msg = "") => `https://wa.me/${n.replace(/\D/g, "")}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

export default function Home() {
  const [lang, setLang] = useState<Lang>(brand.defaultLang as Lang);
  const t = (x: T) => x[lang] || x[lang === "ar" ? "en" : "ar"];
  const c = brand.contact;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const cta = c.whatsapp ? waLink(c.whatsapp, lang === "ar" ? "مرحباً، أريد استشارة قانونية" : "Hi, I'd like a legal consultation") : c.phone ? `tel:${c.phone}` : "#contact";
  const socials = [
    { k: "instagram", label: "Instagram", url: c.instagram },
    { k: "facebook", label: "Facebook", url: c.facebook },
    { k: "tiktok", label: "TikTok", url: c.tiktok },
  ].filter((s) => s.url);

  return (
    <main className={lang === "ar" ? "f-ar" : "f-en"}>
      <header className="nav">
        <a href="#top" className="brand">
          {brand.logo ? <img src={brand.logo} alt={t(brand.name)} /> : null}
          <span>{t(brand.name)}</span>
        </a>
        <nav className="links">
          <a href="#about">{t(UI.about)}</a>
          {products.length > 0 && <a href="#products">{t(UI.products)}</a>}
          {gallery.length > 0 && <a href="#gallery">{t(UI.gallery)}</a>}
          <a href="#contact">{t(UI.contact)}</a>
        </nav>
        <button className="lang" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label="Switch language">
          {lang === "ar" ? "EN" : "عربي"}
        </button>
      </header>

      <section id="top" className="hero" style={brand.hero ? { backgroundImage: `url(${brand.hero})` } : undefined}>
        <div className="hero-overlay" />
        <div className="hero-inner">
          {brand.logo ? <img className="hero-logo" src={brand.logo} alt="" /> : null}
          <h1>{t(brand.name)}</h1>
          <p>{t(brand.tagline)}</p>
          <a className="btn" href={cta} target="_blank" rel="noreferrer">{t(UI.order)}</a>
        </div>
      </section>

      <section id="about" className="section">
        <h2>{t(UI.about)}</h2>
        <p className="lead">{t(brand.about)}</p>
        <div className="highlights">
          {brand.highlights.map((h, i) => (
            <div className="card hl" key={i}>
              <div className="icon">{h.icon}</div>
              <h3>{t(h.title)}</h3>
              <p>{t(h.text)}</p>
            </div>
          ))}
        </div>
      </section>

      {products.length > 0 && (
        <section id="products" className="section alt">
          <h2>{t(UI.products)}</h2>
          <div className="grid">
            {products.map((p, i) => (
              <div className="card product" key={i}>
                {p.image ? <img src={p.image} alt={t(p.name)} loading="lazy" /> : <div className="ph">{t(p.name).charAt(0)}</div>}
                <div className="pbody">
                  <h3>{t(p.name)}</h3>
                  {t(p.text) && <p>{t(p.text)}</p>}
                  <div className="prow">
                    {p.price && <span className="price">{p.price}</span>}
                    {c.whatsapp && (
                      <a className="mini" href={waLink(c.whatsapp, `${lang === "ar" ? "أريد طلب" : "I'd like to order"}: ${t(p.name)}`)} target="_blank" rel="noreferrer">
                        {t(UI.order)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section id="gallery" className="section">
          <h2>{t(UI.gallery)}</h2>
          <div className="gallery">
            {gallery.map((g, i) => <img key={i} src={g} alt="" loading="lazy" />)}
          </div>
        </section>
      )}

      <section id="contact" className="section alt">
        <h2>{t(UI.contact)}</h2>
        <div className="contact">
          <div className="card cinfo">
            {t(c.address) && (<div><h4>{t(UI.address)}</h4><p>{t(c.address)}</p></div>)}
            {t(c.hours) && (<div><h4>{t(UI.hours)}</h4><p>{t(c.hours)}</p></div>)}
            <div className="cbtns">
              {c.whatsapp && <a className="btn" href={waLink(c.whatsapp)} target="_blank" rel="noreferrer">{t(UI.whatsapp)}</a>}
              {c.phone && <a className="btn ghost" href={`tel:${c.phone}`}>{t(UI.call)}</a>}
            </div>
            {socials.length > 0 && (
              <div><h4>{t(UI.follow)}</h4>
                <div className="socials">{socials.map((s) => <a key={s.k} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
              </div>
            )}
          </div>
          {c.map && (
            <iframe className="map" title="map" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(c.map)}&output=embed`} />
          )}
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} {t(brand.name)} — {t(UI.rights)}</footer>

      {c.whatsapp && (
        <a className="wa-float" href={waLink(c.whatsapp)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 2 6.8L3 29l6.8-2.2c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-2 0-3.9-.6-5.6-1.6l-.4-.2-4 1.3 1.3-3.9-.3-.4a10.5 10.5 0 1 1 9 4.8zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/></svg>
        </a>
      )}
    </main>
  );
}
