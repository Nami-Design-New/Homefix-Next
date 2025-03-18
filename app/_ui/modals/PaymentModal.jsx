"use client";
import { Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { findNonSerializableValue } from "@reduxjs/toolkit";
import { paymentAction } from "@/app/_lib/actions";

export default function PaymentModal({
  show,
  setShow,
  handlePayment,
  orderId,
}) {
  const t = useTranslations();
  const [loading, setLoading] = useState();
  const [paymentType, setPaymentType] = useState("cash");
  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);
    console.log(paymentType);

    try {
      const res = await paymentAction(paymentType, orderId);
      if (res?.code === 200) {
        setShow(false);
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (e) {
      console.error(e);
      toast.error(
        "An error occurred while processing your payment. Please try again later."
      );
    } finally {
      setLoading(false);
    }
    setLoading;
  }
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("choosePaymentType")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={handlePayment}>
          <div className="radios mb-2">
            <label htmlFor="cash">
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                checked={paymentType === "cash"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              <span className={paymentType === "cash" ? "active" : ""}>
                {t("cash")}
              </span>
            </label>

            <label htmlFor="online">
              <input
                type="radio"
                name="payment"
                id="online"
                value="online"
                checked={paymentType === "online"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              <span className={paymentType === "online" ? "active" : ""}>
                {t("online")}
              </span>
            </label>
          </div>
          <SubmitButton
            loading={loading}
            name={t("confirmPayment")}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
