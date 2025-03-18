"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import PaymentModal from "../modals/PaymentModal";

export default function PaymentWrapper({ orderId }) {
  const [showPaymentModal, setShowPaymentModal] = useState();
  const t = useTranslations();
  return (
    <>
      <button onClick={() => setShowPaymentModal(true)}>
        {t("confirmPayment")}
      </button>
      <PaymentModal show={showPaymentModal} setShow={setShowPaymentModal} orderId = {orderId} />
    </>
  );
}
