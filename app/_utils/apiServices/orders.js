import axiosInstance from "@/app/_lib/axiosInstance";

export async function getOrders(type, userType) {
  const response = await axiosInstance.get(
    `homefix/${userType === "provider" ? "orders-provider" : "orders-client"}`,
    { params: { type } }
  );

  return response;
}
