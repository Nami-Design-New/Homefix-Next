"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function ShowRateButton({ setShowRate }) {
  const t = useTranslations();
  return (
    <button className="rate_btn" onClick={() => setShowRate(true)}>
      <Image width={24} height={24} src="/icons/star.svg" alt="star" />
      {t("rateTechnical")}
    </button>
  );
}
