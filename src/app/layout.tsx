import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="overflow-x-hidden">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);
  const navigation = await client.getSingle("navigation").catch(() => null);

  return (
    <Bounded
      as="header"
      yPadding="sm"
      className="border-b"
      style={{ borderColor: "rgba(232, 223, 208, 0.5)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <PrismicNextLink
          href="/"
          className="text-2xl font-bold tracking-tight header-logo"
          style={{ color: "var(--color-earth-900)" }}
        >
          {settings ? (
            <PrismicText field={settings.data.siteTitle} />
          ) : (
            "Clareiras"
          )}
        </PrismicNextLink>
        <nav className="flex items-center gap-6 md:gap-10">
          <ul className="flex flex-wrap items-center gap-6 md:gap-8">
            {navigation?.data?.links?.map((item) => (
              <li key={asText(item.label)}>
                <PrismicNextLink
                  field={item.link}
                  className="font-medium tracking-tight relative group nav-link"
                  style={{ color: "var(--color-earth-700)" }}
                >
                  <PrismicText field={item.label} />
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full nav-link-underline"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                </PrismicNextLink>
              </li>
            ))}
            <li>
              <Link
                href="/videos"
                className="font-medium tracking-tight relative group nav-link text-earth-700"
              >
                Vídeos
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full nav-link-underline"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4 border-l pl-6" style={{ borderColor: "rgba(232, 223, 208, 0.5)" }}>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </Bounded>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a 
        href="https://www.instagram.com/clareiras.blogcast" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link text-earth-700 hover:text-accent transition-colors"
        aria-label="Instagram"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a 
        href="https://www.youtube.com/@ClareirasBlogCast" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link text-earth-700 hover:text-accent transition-colors"
        aria-label="YouTube"
        title="YouTube"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"></path>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
        </svg>
      </a>
      
    </div>
  );
}

function Footer() {
  return (
    <Bounded
      as="footer"
      yPadding="sm"
      className="border-t mt-20"
      style={{ borderColor: "rgba(232, 223, 208, 0.5)" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm" style={{ color: "var(--color-earth-700)" }}>
          <p>&copy; {new Date().getFullYear()} Clareiras. Todos os direitos reservados.</p>
        </div>
        <SocialLinks />
      </div>
    </Bounded>
  );
}
