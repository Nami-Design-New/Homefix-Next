import axiosInstance from "@/app/_lib/axiosInstance";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const response = await axiosInstance.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
}
