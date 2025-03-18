import React from "react";
import PaymentWrapper from "./PaymentWrapper";
import { getTranslations } from "next-intl/server";
export default async function PaymentCard({ orderDetails }) {
  const t = await getTranslations();

  return (
    <>
      <div className="pay_container">
        <div className="content">
          <h6>{t("totalCost")}: </h6>
          <h5>
            {orderDetails?.total_cost} <span>{t("dinar")}</span>
          </h5>
        </div>
        <PaymentWrapper orderId={orderDetails?.id} />
      </div>
    </>
  );
}
