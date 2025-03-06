import axiosInstance from "../_lib/axiosInstance";
import DownLoadApp from "../_ui/home/DownLoadApp";
import Hero from "../_ui/home/Hero";
import HowItWorksSection from "../_ui/home/HowItWoeksSection";
import Services from "../_ui/home/Services";
import WhyUs from "../_ui/home/WhyUs";
import ProviderOrders from "../_ui/ProviderOrders";
import { getUser } from "../_utils/apiServices/auth";

export default async function Home({ params }) {
  const { locale } = await params;
  const user = await getUser();
  const res = await axiosInstance.get("/homefix/client-home");
  let slider;
  if (res?.data?.code === 200) {
    slider = res?.data?.data?.sliders;
  }
  return (
    <>
      {user?.type === "provider" ? (
        <ProviderOrders />
      ) : (
        <div>
          <Hero slider={slider} />
          <Services />
          <HowItWorksSection />
          <WhyUs />
          <DownLoadApp />
        </div>
      )}
    </>
  );
}
