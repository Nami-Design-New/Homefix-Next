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

export async function generateMetadata({ params }) {
  const { locale } = (await params) || { locale: "en" };

  return {
    metaDataBase: new URL("https://home-fix-blue.vercel.app/"),
    title: locale === "ar" ? "هوم فيكس" : "Home Fix",
    description:
      locale === "ar"
        ? "منصتك المفضلة لجميع خدمات صيانة وإصلاح المنازل."
        : "Your go-to platform for all home maintenance and repair services.",
    keywords:
      locale === "ar"
        ? ["صيانة المنازل", "إصلاح", "السباكة", "الكهرباء", "التنظيف"]
        : ["home maintenance", "repair", "plumbing", "electrical", "cleaning"],

    openGraph: {
      title: locale === "ar" ? "هوم فيكس" : "Home Fix",
      description:
        locale === "ar"
          ? "منصتك المفضلة لجميع خدمات صيانة وإصلاح المنازل."
          : "Your go-to platform for all home maintenance and repair services.",
      url: "https://home-fix-blue.vercel.app/",
      siteName: "Home Fix",
      images: [
        {
          url: "/images/logo.svg",
          width: 36,
          height: 125,
          alt: "Home Fix Logo",
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: locale === "ar" ? "هوم فيكس" : "Home Fix",
      description:
        locale === "ar"
          ? "منصتك المفضلة لجميع خدمات صيانة وإصلاح المنازل."
          : "Your go-to platform for all home maintenance and repair services.",
      images: [
        {
          url: "/images/logo.svg",
          width: 36,
          height: 125,
          alt: "Home Fix Logo",
        },
      ],
    },
  };
}

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
