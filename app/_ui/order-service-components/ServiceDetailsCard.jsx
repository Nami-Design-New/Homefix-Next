import Image from "next/image";
import React from "react";

export default async function ServiceDetailsCard({ service }) {
  return (
    <div className="col-lg-10  mb-3">
      <div className="service_details_card">
        <div className="img">
          <Image
            src={service.image}
            width={120}
            height={84}
            alt={service.title}
          />
        </div>
        <div className="content">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <ul>
            <li>
              <div className="img-wrapper">
                <Image src="/images/technical.svg" fill alt="technical" />
              </div>
              <h6>Available Technicians: {service.technicals_count}</h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
