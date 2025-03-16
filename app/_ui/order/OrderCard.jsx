import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

export default async function OrderCard({ order, user }) {
  const t = await getTranslations();
  const link =
    user?.type === "provider" ? `/${order.id}` : `/my-orders/${order.id}`;
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="service-icon">
          <Image
            src={order?.service?.image}
            width={100}
            height={100}
            alt={order.service}
          />
          <span>{order?.service?.title}</span>
        </div>
        <Link href={link} className="details">
          {t("details")}
        </Link>
      </div>
      <div className="order-content">
        <div className="order-info">
          <p>
            <i className="fa-regular fa-calendar"></i> {order?.date}
          </p>
          <p>
            <i className="fa-regular fa-clock"></i> {order?.time}
          </p>
          <p className="w-100">
            <i className="fa-solid fa-location-dot"></i> {order?.address}
          </p>
        </div>
      </div>
      {order?.status === "complete" && (
        <div className="complete">{t("completedOrder")}</div>
      )}
      {order?.status === "canceled" && (
        <div className="canceled">{t("canceledOrder")}</div>
      )}
      {order?.status === "client_refuse_cost" && (
        <div className="canceled">{t("clientRefusedCost")}</div>
      )}
    </div>
  );
}
