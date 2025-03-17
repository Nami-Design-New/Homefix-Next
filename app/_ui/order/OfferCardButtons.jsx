"use client";
import { changeOfferStatusAction } from "@/app/_lib/actions";
import { useTranslations } from "next-intl";

export default function OfferCardButtons({
  className,
  loading,
  status,
  orderId,
  children,
  offerId,
}) {
  const t = useTranslations();
  const payload = {
    status,
    offer_id: offerId,
  };
  const handleChange = () => {
    const res = changeOfferStatusAction(orderId, payload);
    const data = res.data;
    return data;
  };
  return (
    <button
      className={`${className}`}
      disabled={loading}
      onClick={handleChange}
    >
      {children}
    </button>
  );
}
