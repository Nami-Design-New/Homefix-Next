import axiosInstance from "@/app/_lib/axiosInstance";

export async function getOrders(type, userType) {
  const response = await axiosInstance.get(
    `homefix/${userType === "provider" ? "orders-provider" : "orders-client"}`,
    { params: { type } }
  );

  return response;
}

export async function getOrderDetails(id, userType) {
  try {
    const res = await axiosInstance.get(
      `/homefix/${
        userType === "provider" ? "orders-provider" : "orders-client"
      }/${id}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching order:", error.message);
    throw error;
  }
}
