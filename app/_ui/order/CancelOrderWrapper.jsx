"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CancelOrder from "../modals/CancelOrder";
import CancelOrderButton from "./CancelOrderButton";

const viewCancelButton = (orderStatus) => {
  if (orderStatus === "canceled") return false;
  if (orderStatus === "client_accept_cost") return false;
  if (orderStatus === "start_maintenance") return false;
  if (orderStatus === "end_maintenance") return false;
  if (orderStatus === "confirm_collection") return false;

  return true;
};

export default function CancelOrderWrapper({ orderStatus, orderId }) {
  const t = useTranslations();
  const [showModal, setShowModal] = useState();

  return (
    <>
      {viewCancelButton(orderStatus) && (
        <CancelOrderButton setShowModal={setShowModal} />
      )}
      <CancelOrder show={showModal} setShow={setShowModal} orderId={orderId} />
    </>
  );
}
