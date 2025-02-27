import axiosInstance from "@/app/_lib/axiosInstance";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function Services() {
  const t = await getTranslations();
  const res = await axiosInstance.get("/homefix/most-order-services");
  let services;
  if (res.status === 200) {
    services = res.data?.data;
  }
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-3">
            <h2>{t("Services.title")}</h2>
            <p className="subtitle">{t("Services.description")}</p>
          </div>
          {services?.map((service) => (
            <div key={service.id} className="col-lg-3 col-6 p-2">
              <Link href={`/order-service?id=${service.id}`}>
                <div className="service-card">
                  <div className="service-image">
                    <img src={service?.image} alt={service?.title} />
                  </div>
                  <div className="content">
                    <h5 className="service-title">{service?.title}</h5>
                    <p className="service-subtitle mb-2 text-muted">
                      {service?.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
