import CancelOrder from "@/app/_ui/modals/CancelOrder";
import BackButton from "@/app/_ui/order/BackButton";
import CancelOrderButton from "@/app/_ui/order/CancelOrderButton";
import CancelOrderWrapper from "@/app/_ui/order/CancelOrderWrapper";
import OffersSide from "@/app/_ui/order/OfferSide";
import OrderInfo from "@/app/_ui/order/OrderInfo";
import OrderStatus from "@/app/_ui/order/OrderStatus";
import { getUser } from "@/app/_utils/apiServices/auth";
import { getOrderDetails } from "@/app/_utils/apiServices/orders";
import { getTranslations } from "next-intl/server";

export default async function page({ params }) {
  const t = await getTranslations();
  const { id } = await params;
  const user = await getUser();
  const res = await getOrderDetails(id, user);
  let orderDetails;
  if (res.data?.code === 200) {
    orderDetails = res.data?.data;
  }

  return (
    <section className="orderDetails">
      <div className="container">
        <div className="row">
          <div className="col-lg-12  p-2">
            <h2 className="orderDetails-title">
              <BackButton />
              {t("orderDetails")}
            </h2>
          </div>
          <div className="col-lg-12 p-2">
            <OrderStatus orderDetails={orderDetails} />
          </div>

          {orderDetails?.status !== "canceled" && (
            <OffersSide orderDetails={orderDetails} />
          )}

          <div
            className={`p-2 ${
              orderDetails.status === "canceled" ? "col-lg-12" : "col-lg-8"
            } `}
          >
            <OrderInfo orderDetails={orderDetails} />
            <CancelOrderWrapper
              orderStatus={orderDetails?.status}
              orderId={orderDetails?.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
