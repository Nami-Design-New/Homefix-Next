import React from "react";
import OrderCard from "./OrderCard";
import { getUser } from "@/app/_utils/apiServices/auth";
import axiosInstance from "@/app/_lib/axiosInstance";
import { getOrders } from "@/app/_utils/apiServices/orders";

export default async function OrderList({ type }) {
  const user = await getUser();
  let orders;
  const response = await getOrders(type, user?.type);
  if (response?.data?.code === 200) {
    orders = response.data.data;
  }
  if (orders?.length === 0)
    return (
      <div className="col-12 p-2">
        <div className="no-data">{t("noNewOrdersAvailable")}</div>
      </div>
    );

  return (
    <>
      {orders?.map((order) => (
        <div className="col-lg-6 col-12 p-2" key={order?.id}>
          <OrderCard order={order} user={user} />
        </div>
      ))}
    </>
  );
}
