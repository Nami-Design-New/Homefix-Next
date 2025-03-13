import axiosInstance from "@/app/_lib/axiosInstance";

export async function getNotifications() {
  try {
    const res = await axiosInstance.get("homefix/notification");
    console.log("response Data :", res.data);

    if (res.status === 200) {
      return res.data.data || {};
    }
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
}
