import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "../_ui/Header";

// Font Awesome styles
import "../_styles/all.min.css";
// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
//  styles
import "../_styles/style.css";
import Footer from "../_ui/Footer";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${locale === "en" ? "en" : ""}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
