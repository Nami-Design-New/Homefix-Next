import axiosInstance from "../_lib/axiosInstance";
import DownLoadApp from "../_ui/home/DownLoadApp";
import Hero from "../_ui/home/Hero";
import HowItWorksSection from "../_ui/home/HowItWoeksSection";
import Services from "../_ui/home/Services";
import WhyUs from "../_ui/home/WhyUs";

export default async function Home() {
  const res = await axiosInstance.get("/homefix/client-home");
  let slider;
  if (res?.data?.code === 200) {
    slider = res?.data?.data?.sliders;
  }
  return (
    <div>
      <Hero slider={slider} />
      <Services />
      <HowItWorksSection />
      <WhyUs />
      <DownLoadApp />
    </div>
  );
}
