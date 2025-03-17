import { getTranslations } from "next-intl/server";
import Image from "next/image";
import StarsRate from "../StarRate";
import OfferCardButtons from "./OfferCardButtons";

export default async function OfferCard({ offer, orderId }) {
  const t = await getTranslations();

  return (
    <div className="card driverCard ">
      <div className="d-flex justify-content-between align-items-center">
        <div className="driverInfo">
          <Image
            width={48}
            height={48}
            src={offer?.technical?.image}
            className="driverImage"
            alt={offer?.technical?.name}
          />
          <div>
            <p className="driverName">{offer?.technical?.name}</p>
            <StarsRate rate={offer?.technical?.average_rating} />
          </div>
        </div>
        <p className="price">
          <strong>{offer?.cost}</strong> {t("dinar")}
        </p>
      </div>

      <div className="buttonGroup">
        <OfferCardButtons
          className="acceptBtn"
          status="accept"
          orderId={orderId}
          offerId={offer?.id}
        >
          {t("accept")}
        </OfferCardButtons>
        <OfferCardButtons
          className="rejectBtn"
          status="client_refused"
          orderId={orderId}
          offerId={offer?.id}
        >
          {t("refuse")}
        </OfferCardButtons>
      </div>
    </div>
  );
}
