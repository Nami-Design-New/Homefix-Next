import DataLoader from "@/app/_ui/DataLoader";
import OrderList from "@/app/_ui/order/OrderList";
import OrderTaps from "@/app/_ui/order/OrderTaps";
import Spinner from "@/app/_ui/Spinner";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function page({ searchParams }) {
  const t = await getTranslations();
  const type = (await searchParams).type ?? "current";

  return (
    <div className="orders-container">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <OrderTaps />
          </div>
          <Suspense fallback={<DataLoader />} key={type}>
            <OrderList type={type} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
