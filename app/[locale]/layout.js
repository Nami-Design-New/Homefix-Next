import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "../_providers/ReactQueryProvider";
import ReduxProvider from "../_redux/Provider";
import Footer from "../_ui/Footer";
import Header from "../_ui/Header";
import AuthModal from "../_ui/modals/AuthModal";

import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/app/_styles/all.min.css";
import "@/app/_styles/style.css";
import "swiper/css";
import AuthProvider from "../_providers/AuthProvider";
import AuthCheck from "../_providers/AuthCheck";

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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${locale === "en" ? "en" : ""}`}>
        <NextIntlClientProvider messages={messages}>
          <Toaster
            expand={false}
            duration={2000}
            richColors
            position="bottom-right"
          />
          <ReduxProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <Header />
                <main>
                  {children}
                  <AuthCheck />
                </main>
                <Footer />
              </AuthProvider>
            </ReactQueryProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
