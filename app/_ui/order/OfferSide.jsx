import { Link } from "@/i18n/routing";
import Image from "next/image";
import OfferCard from "./OfferCard";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export default async function OffersSide({ orderDetails }) {
  const t = await getTranslations();

  // const { t } = useTranslation();
  // const [show, setShow] = useState(false);
  // const [showRate, setShowRate] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [paymentType, setPaymentType] = useState("cash");
  // const [rateLoading, setRateLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   stars: 0,
  //   notes: "",
  //   order_id: orderDetails?.id,
  //   provider_id: orderDetails?.technical?.id,
  // });
  // const queryClient = useQueryClient();

  // const viewReciept = () => {
  //   if (orderDetails?.status === "set_maintenance_cost") return true;
  //   if (orderDetails?.status === "client_accept_cost") return true;
  //   if (orderDetails?.status === "start_maintenance") return true;
  //   if (orderDetails?.status === "end_maintenance") return true;
  //   if (orderDetails?.status === "confirm_collection") return true;

  //   return false;
  // };

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const res = await axiosInstance.put(
  //       `/homefix/order-payment/${orderDetails?.id}`,
  //       { payment_type: paymentType }
  //     );

  //     if (res?.data?.code === 200) {
  //       setShow(false);
  //       queryClient.invalidateQueries(["order-details", orderDetails?.id]);
  //       toast.success(res?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Some thing went wrong, please try again or contact us.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleRate = async (e) => {
  //   e.preventDefault();
  //   setRateLoading(true);

  //   try {
  //     const res = await axiosInstance.post(
  //       "homefix/provider-reviews",
  //       formData
  //     );

  //     if (res?.data?.code === 200) {
  //       setShowRate(false);
  //       queryClient.invalidateQueries(["order-details", orderDetails?.id]);
  //       toast.success(res?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Some thing went wrong, please try again or contact us.");
  //   } finally {
  //     setRateLoading(false);
  //   }
  // };

  const acceptedOffers = orderDetails?.offers?.filter(
    (offer) => offer?.status === "accept"
  );
  console.log(orderDetails);

  return (
    <div className="col-lg-4 p-2">
      {acceptedOffers?.length > 0 ? (
        <>
          {acceptedOffers?.map((offer) => (
            <div className="technical_card" key={offer?.id}>
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
                  to={`tel:${
                    offer?.technical?.country_code + offer?.technical?.phone
                  }`}
                >
                  <Image
                    width={48}
                    height={48}
                    src="/icons/phone-fill.svg"
                    alt=""
                  />
                </Link>
                {/* {!orderDetails?.has_rated && (
                  // <button
                  //   className="rate_btn"
                  //   onClick={() => setShowRate(true)}
                  // >
                  //   <Image
                  //     width={48}
                  //     height={48}
                  //     src="/icons/star.svg"
                  //     alt="star"
                  //   />
                  //   {t("rateTechnical")}
                  // </button>
                )} */}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="driversList p-3">
          {(!orderDetails?.offers || orderDetails?.offers.length === 0) && (
            <h6 className="noOffers">{t("noOffers")}</h6>
          )}

          {orderDetails?.offers?.filter((offer) => offer.status === "accept")
            .length === 0 && (
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

      {/* {viewReciept() && <UserReceipt orderDetails={orderDetails} />} */}

      {orderDetails?.status === "end_maintenance" && !orderDetails?.is_paid && (
        <div className="pay_container">
          <div className="content">
            <h6>{t("totalCost")}: </h6>
            <h5>
              {orderDetails?.total_cost} <span>{t("dinar")}</span>
            </h5>
          </div>
          {/* <button onClick={() => setShow(true)}>{t("confirmPayment")}</button> */}
        </div>
      )}
      {/* 
      <PaymentModal
        show={show}
        setShow={setShow}
        paymentType={paymentType}
        loading={loading}
        handlePayment={handlePayment}
        setPaymentType={setPaymentType}
      />

      <TechnicalRate
        show={showRate}
        setShow={setShowRate}
        loading={rateLoading}
        formData={formData}
        setFormData={setFormData}
        handleRate={handleRate}
      /> */}
    </div>
  );
}
