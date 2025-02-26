import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": {
      en: "/",
      ar: "/",
    },
    "/aboutus": {
      en: "/about-us",
      ar: "/عن-المنصة",
    },
    "/order-service": {
      en: "/order-service",
      ar: "/طلب-خدمة",
    },
    "/my-orders": {
      en: "/my-orders",
      ar: "/طلباتي",
    },
    "/my-orders/:id": {
      en: "/my-orders/:id",
      ar: "/طلباتي/:id",
    },
    "/settings": {
      en: "/settings",
      ar: "/الإعدادات",
    },
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      ar: "/الشروط-والأحكام",
    },
    "/privacy": {
      en: "/privacy",
      ar: "/الخصوصية",
    },
    "/fqs": {
      en: "/faqs",
      ar: "/الأسئلة-الشائعة",
    },
    "/edit-profile": {
      en: "/edit-profile",
      ar: "/تعديل-الملف-الشخصي",
    },
    "/contactus": {
      en: "/contact-us",
      ar: "/اتصل-بنا",
    },
    "/notifications": {
      en: "/notifications",
      ar: "/الإشعارات",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
