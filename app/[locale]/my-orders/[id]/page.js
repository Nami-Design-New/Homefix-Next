import BackButton from "@/app/_ui/order/BackButton";
import CancelOrderButton from "@/app/_ui/order/CancelOrderButton";
import OrderInfo from "@/app/_ui/order/OrderInfo";
import { getUser } from "@/app/_utils/apiServices/auth";
import { getOrderDetails } from "@/app/_utils/apiServices/orders";
import { getTranslations } from "next-intl/server";
import { Col, Container, Row } from "react-bootstrap";

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
      <Container>
        <Row>
          <Col lg={12} className="p-2">
            <h2 className="orderDetails-title">
              <BackButton />
              {t("orderDetails")}
            </h2>
          </Col>

          <Col lg={12} className="p-2">
            {/* <OrderStatus orderDetails={orderDetails} /> */}
          </Col>

          {/* {orderDetails?.status !== "canceled" && (
            // <OffersSide orderDetails={orderDetails} />
          )} */}

          <Col
            lg={orderDetails?.status === "canceled" ? 12 : 8}
            className="p-2"
          >
            <OrderInfo orderDetails={orderDetails} />
            { <CancelOrderButton />}
          </Col>
        </Row>
      </Container>

      {/* <CancelOrder
        show={showModal}
        setShow={setShowModal}
        loading={isPending}
        cancelReason={cancelReason}
        handleSubmit={handleSubmit}
        setCancelReason={setCancelReason}
      /> */}
    </section>
  );
}
