import ContactForm from "@/app/_ui/home/ContactForm";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export default async function page() {
  const t = await getTranslations("");
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-5 col-12 p-2">
          <h2 className="contact-title">{t("contactTitle")}</h2>
          <p className="contact-text">{t("contactText")}</p>
          <div className="contant_img">
            <Image
              src="/images/contactform.png"
              alt="contactus"
              width={500}
              height={400}
              style={{ width: "80%", height: "80%" }}
            />
          </div>
        </div>
        <div className="col-lg-7 col-12 p-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
