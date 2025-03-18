import { getTranslations } from "next-intl/server";
import OfferCard from "./OfferCard";
import TechnicalCard from "./TechnicalCard";
import PaymentCard from "./PaymentCard";
import UserReceipt from "./UserReceipt";

export default async function OffersSide({ orderDetails }) {
  const t = await getTranslations();
  const acceptedOffers = orderDetails?.offers?.filter(
    (offer) => offer?.status === "accept"
  );
  return (
    <div className="col-lg-4 p-2">
      {acceptedOffers?.length > 0 ? (
        <>
          {acceptedOffers?.map((offer) => (
            <TechnicalCard
              key={offer?.id}
              orderDetails={orderDetails}
              offer={offer}
            />
          ))}
        </>
      ) : (
        <div className="driversList p-3">
          {(!orderDetails?.offers || orderDetails?.offers.length === 0) && (
            <h6 className="noOffers">{t("noOffers")}</h6>
          )}

          {acceptedOffers?.length === 0 && (
            <>
              {orderDetails?.offers?.map((offer) => (
                <OfferCard
                  key={offer.id}
                  orderId={orderDetails?.id}
                  offer={offer}
                />
              ))}
            </>
          )}
        </div>
      )}

      {<UserReceipt orderDetails={orderDetails} />}
      {orderDetails?.status === "end_maintenance" && !orderDetails?.is_paid && (
        <PaymentCard orderDetails={orderDetails} />
      )}
    </div>
  );
}
