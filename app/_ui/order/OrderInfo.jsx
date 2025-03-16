import { getTranslations } from "next-intl/server";
import { Card } from "react-bootstrap";
import OrderMapSection from "./OrderMapSection";
import Image from "next/image";

export default async function OrderInfo({ orderDetails }) {
  const t = getTranslations();
  return (
    <div className="details p-3">
      <Card className="orderInfo">
        <div className="order-header">
          <span className="order-category">
            <Image
              src={orderDetails?.service?.image}
              alt={orderDetails?.service?.title}
              className="category-icon"
              width={16}
              height={16}
            />
            {orderDetails?.service?.title}
          </span>
          <div className="order-id">
            <p>#{orderDetails?.code}</p>
            <Image
              src="/icons/code.svg"
              alt="Order Icon"
              className="order-icon"
              width={18}
              height={20}
            />
          </div>
        </div>

        <p className="order-location">
          <i className="fa-solid fa-location-dot mx-1"></i>
          {orderDetails?.address}
        </p>

        <div className="mapPlaceholder">
          <OrderMapSection
            lat={orderDetails?.latitude}
            lng={orderDetails?.longitude}
          />
        </div>

        <div className="imagesRow">
          {orderDetails?.order_files?.map((file) => (
            <Image
              src={file?.file}
              alt={file?.id}
              className="orderImage"
              key={file?.id}
              width={120}
              height={120}
            />
          ))}
        </div>

        <p className="order-description">{orderDetails?.description}</p>

        <div className="audioSection">
          {orderDetails?.voice && (
            <audio src={orderDetails?.voice} controls></audio>
          )}
        </div>
      </Card>
    </div>
  );
}
