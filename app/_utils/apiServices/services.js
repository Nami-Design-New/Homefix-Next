import axiosInstance from "@/app/_lib/axiosInstance";

export default async function getServices() {
  try {
    const res = await axiosInstance.get("/homefix/most-order-services");
    if (res.status === 200) {
      return res.data?.data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
