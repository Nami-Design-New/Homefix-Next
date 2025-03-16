import ServiceForm from "@/app/_ui/order-service-components/orderDetailsForm";
import ServiceDetailsCard from "@/app/_ui/order-service-components/ServiceDetailsCard";
import getServices from "@/app/_utils/apiServices/services";
import { redirect } from "@/i18n/routing";

export default async function page({ searchParams, params }) {
  const { locale } = await params;
  const id = (await searchParams?.id) ? parseInt(searchParams.id) : null;
  if (!id) redirect("/");

  const services = await getServices();
  const service = services.find((s) => s.id === id);

  if (!service) notFound();
  return (
    <div className="service-details container">
      <div className="row justify-content-center">
        <ServiceDetailsCard service={service} />
        <ServiceForm serviceId={id} />
      </div>
    </div>
  );
}
