import ContactForm from "@/app/_ui/home/ContactForm";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export default async function page() {
  const t = await getTranslations("");
  return (
    <section className="contact_page">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            <h2 className="contact-title">{t("contactTitle")}</h2>
            <p className="contact-text">{t("contactText")}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
