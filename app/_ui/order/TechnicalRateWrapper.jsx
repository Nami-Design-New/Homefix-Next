"use client";
import Image from "next/image";
import React, { useState } from "react";
import TechnicalRate from "../modals/TechnicalRate";
import { useTranslations } from "next-intl";
import ShowRateButton from "./ShowRateButton";

export default function TechnicalRateWrapper({ orderDetails }) {
  const [showRate, setShowRate] = useState();
  const t = useTranslations();
  return (
    <>
      {!orderDetails?.has_rated && <ShowRateButton setShowRate={setShowRate} />}
      <TechnicalRate
        show={showRate}
        setShow={setShowRate}
        orderDetails={orderDetails}
      />
    </>
  );
}
