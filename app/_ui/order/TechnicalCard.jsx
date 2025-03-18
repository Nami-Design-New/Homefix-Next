import Image from "next/image";
import Link from "next/link";
import React from "react";
import TechnicalRateWrapper from "./TechnicalRateWrapper";

export default function TechnicalCard({ orderDetails, offer }) {
  return (
    <div className="technical_card">
      <div className="technical">
        <div className="img">
          <Image
            width={48}
            height={48}
            src={offer?.technical?.image}
            alt={offer?.technical?.name}
          />
        </div>
        <div className="content">
          <h6>{offer?.technical?.name}</h6>
          <p>{offer?.technical?.provide_detail?.specialty?.title}</p>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Link
          href={`tel:${
            offer?.technical?.country_code + offer?.technical?.phone
          }`}
        >
          <Image width={48} height={48} src="/icons/phone-fill.svg" alt="" />
        </Link>
        <TechnicalRateWrapper orderDetails={orderDetails} />
      </div>
    </div>
  );
}
