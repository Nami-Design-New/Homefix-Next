"use client";

import { userReceiptAcceptOrRefuseAction } from "@/app/_lib/actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const viewReciept = (orderStatus) => {
  if (orderStatus === "set_maintenance_cost") return true;
  if (orderStatus === "client_accept_cost") return true;
  if (orderStatus === "start_maintenance") return true;
  if (orderStatus === "end_maintenance") return true;
  if (orderStatus === "confirm_collection") return true;
  return false;
};

const viewButtons = (orderStatus) => {
  if (orderStatus === "client_refuse_cost") return false;
  if (orderStatus === "client_accept_cost") return false;
  if (orderStatus === "start_maintenance") return false;
  if (orderStatus === "end_maintenance") return false;
  if (orderStatus === "confirm_collection") return false;
  return true;
};

export default function UserReceipt({ orderDetails }) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState();
  const handleAcceptOrReject = async (status) => {
    setIsLoading(true);
    const reqBody = {
      status,
      _method: "put",
    };
    try {
      const res = await userReceiptAcceptOrRefuseAction(
        reqBody,
        orderDetails?.id
      );
      if (res?.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {true && (
        <div className="user_receipt">
          <h5>{t("workCost")}</h5>
          <div className="product_list">
            <h6>{t("productsAndMaterials")}</h6>
            <ul>
              {orderDetails?.order_items?.map((item, index) => (
                <li key={index}>
                  <h6>{item?.item_name}</h6>
                  <p>
                    <b>{item?.item_price}</b> {t("dinar")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ul className="total_cost_list">
            <li>
              <h6>{t("maintenanceCost")}</h6>
              <p>
                <b>{orderDetails?.maintenance_cost}</b> {t("dinar")}
              </p>
            </li>

            <li className="line"></li>

            <li>
              <h6>{t("totalCost")}</h6>
              <p>
                <b>{orderDetails?.total_cost}</b> {t("dinar")}
              </p>
            </li>
          </ul>
          {viewButtons(orderDetails?.status) && (
            <div className="btns">
              <div className="d-flex gap-3">
                <button
                  className="button dark"
                  disabled={false}
                  onClick={() => handleAcceptOrReject("client_refuse_cost")}
                >
                  {t("rejectPrice")}
                </button>
                <button
                  className="button"
                  disabled={false}
                  onClick={() => handleAcceptOrReject("client_accept_cost")}
                >
                  {t("acceptPrice")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
