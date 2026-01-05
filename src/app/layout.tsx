import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

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
        {navigation && navigation.data?.links && (
          <nav>
            <ul className="flex flex-wrap gap-6 md:gap-8">
              {navigation.data.links.map((item) => (
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
            </ul>
          </nav>
        )}
      </div>
    </Bounded>
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
      <div className="text-center text-sm" style={{ color: "var(--color-earth-700)" }}>
        <p>&copy; {new Date().getFullYear()} Clareiras. Todos os direitos reservados.</p>
      </div>
    </Bounded>
  );
}
