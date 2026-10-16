import type { Metadata } from "next";
import brand from "@/content/brand.json";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name.en} | ${brand.name.ar}`,
  description: brand.tagline.en,
  icons: brand.logo ? { icon: brand.logo } : undefined,
  openGraph: { title: brand.name[brand.defaultLang as "ar" | "en"], description: brand.tagline[brand.defaultLang as "ar" | "en"], images: brand.hero ? [brand.hero] : [] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const c = brand.colors;
  const style = { "--primary": c.primary, "--accent": c.accent, "--bg": c.bg, "--text": c.text } as React.CSSProperties;
  return (
    <html lang={brand.defaultLang} dir={brand.defaultLang === "ar" ? "rtl" : "ltr"} style={style}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&family=Poppins:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
