import { getStatusText, getStatusValue } from "@/app/_utils/helper";
import { getTranslations } from "next-intl/server";

export default async function OrderStatus({ orderDetails }) {
  const t = await getTranslations();
  return (
    <>
      {orderDetails?.status === "canceled" ? (
        <div className="canceled_order">
          <h6>{t("canceledByClient")}</h6>
          <p>
            {t("cancelReason")}: <span>{orderDetails?.cancel_reason}</span>
          </p>
        </div>
      ) : (
        <div className="orderStatus">
          <span
            className="progress_indicator"
            style={{
              width: `calc((100% / 7) * ${getStatusValue(orderDetails) || 0})`,
            }}
          ></span>
          <span className="step_indicator">
            {getStatusText(orderDetails, t)}
          </span>
        </div>
      )}
    </>
  );
}
