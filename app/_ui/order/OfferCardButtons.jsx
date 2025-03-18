"use client";
import { changeOfferStatusAction } from "@/app/_lib/actions";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";

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
  const [isPending, startTransition] = useTransition();
  const handleChange = async () => {
    startTransition(async () => {
      const res = await changeOfferStatusAction(orderId, payload);
      if (res.code === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <button
      className={`${className}`}
      disabled={loading}
      onClick={() => handleChange()}
    >
      {isPending ? (
        <i className="fa-regular fa-circle-notch fa-spin" />
      ) : (
        children
      )}
    </button>
  );
}
