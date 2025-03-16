"use client";
import React from "react";
import { useTranslations } from "use-intl";

export default function CancelOrderButton() {
  const t = useTranslations();
  return (
    <button className="cancelButton" onClick={() => setShowModal(true)}>
      {t("cancelOrder")}
    </button>
  );
}
