"use server";

import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API_URL } from "../_utils/constants";
import axiosInstance from "./axiosInstance";
import { getUser } from "../_utils/apiServices/auth";

// auth actions
//logout Action
export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  if (!token) {
    console.log("there is no token");
    return;
  }
  try {
    const res = await axiosInstance.post("auth/logout", null, {
      headers: {
        Authorization: token,
      },
    });
    if (res.data.code === 200) {
      cookieStore.delete("token");
      cookieStore.delete("id");
    }
    return res.data;
  } catch (e) {
    console.log("Error while logout", e);
  }
}

//send Code Action
export async function sendCodeAction(formData, type = "register") {
  const t = await getTranslations();
  const { phone, country_code } = formData;
  const reqBody = {
    phone,
    country_code,
    type,
  };
  const res = await axiosInstance.post("/auth/send-code", reqBody);
  return res.data;
}

// Confirm Code Action

export async function verifyOtpAction(
  phone,
  country_code,
  code,
  type = "register"
) {
  try {
    console.log("sending confirm code....");
    const response = await axiosInstance.post("/auth/confirm-code", {
      phone,
      country_code,
      type,
      code,
    });

    if (response.data.code === 200) {
      console.log("verifyOtpAction response success : ", response.data);
      return { success: true };
    } else {
      console.log("verifyOtpAction response error : ", response);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong with confirm Code. Please try again.",
    };
  }
}

//register User Action

export async function registerUserAction(userData) {
  try {
    console.log("Converting userData to FormData...");

    const formData = new FormData();
    for (const key in userData) {
      if (userData[key] instanceof File) {
        formData.append(key, userData[key], userData[key].name);
      } else {
        formData.append(key, userData[key]);
      }
    }

    console.log("sending user data to auth users ..........");
    console.log("userData", formData);

    const response = await axiosInstance.post("/auth/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.code === 200) {
      console.log("response user register data success", response.data);
      return { success: true, message: response.data.message };
    } else {
      console.log("response user register data error", response.data);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong in login. Please try again.",
    };
  }
}

// Notifications Actions
export async function deleteNotificationAction(id) {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("authToken")?.value;
    const res = await axiosInstance.delete(`/homefix/notification/${id}`);
    revalidatePath("/notifications");
    return res?.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, message: "An error occurred while deleting." };
  }
}

// service order actions

export async function orderServiceAction(payload) {
  const formData = new FormData();
  for (const key in payload) {
    if (Array.isArray(payload[key])) {
      payload[key].forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`${key}[]`, file, file.name);
        } else {
          formData.append(`${key}[${index}]`, file);
        }
      });
    } else if (payload[key] instanceof File) {
      formData.append(key, payload[key], payload[key].name);
    } else {
      formData.append(key, payload[key]);
    }
  }
  console.log("formData :", formData);

  try {
    const res = await axiosInstance.post("/homefix/orders-client", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    console.error("Error while ordering service:", e);
    return {
      success: false,
      message: "An error occurred while ordering service.",
    };
  }
}

export async function changeOfferStatusAction(orderId, payload) {
  const user = await getUser();
  try {
    const response = await axiosInstance.put(
      `/homefix/${
        user === "provider" ? "offers-provider" : "offers-client"
      }/${orderId}`,
      payload
    );
    const data = response.data;
    if (data.code === 200) {
      revalidatePath(`/my-orders/${orderId}`);
    }
    return data;
  } catch (e) {
    console.error("Error while changing order status:", e);
    return {
      success: false,
      message: "An error occurred while changing order status.",
    };
  }
}
export async function changeOrderStatusAction(orderId, request) {
  const user = await getUser();
  const formData = new FormData();

  for (const key in request) {
    formData.append(key, request[key]);
  }

  try {
    const response = await axiosInstance.put(
      `/homefix/${
        user === "provider" ? "offers-provider" : "offers-client"
      }/${orderId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.error("Error while changing order status:", e);
    return {
      success: false,
      message: "An error occurred while changing order status.",
    };
  }
}

export async function userReceiptAcceptOrRefuseAction(reqBody, orderId) {
  const user = await getUser();
  const res = await axiosInstance.post(
    `/homefix/${
      user === "provider" ? "orders-provider" : "orders-client"
    }/${orderId}`,
    reqBody,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (res?.data?.code === 200) {
    revalidatePath("my-orders");
    revalidatePath(`my-orders/${orderId}`);
  }
  return res.data;
}

//rate technical

export async function rateTechnicalAction(reqBody) {
  const res = await axiosInstance.post("homefix/provider-reviews", reqBody);
  if (res.data.code === 200) {
    revalidatePath(`/my-orders/${reqBody.order_id}`);
  }
  return res.data;
}
// Payment action

export async function paymentAction(paymentType, orderId) {
  const reqBody = {
    payment_type: paymentType,
  };
  console.log(reqBody);

  const res = await axiosInstance.put(
    `/homefix/order-payment/${orderId}`,
    reqBody
  );
  if (res?.data?.code === 200) {
    revalidatePath(`/my-orders/${orderId}`);
  }
  return res.data;
}

// contact us
export async function sendMessageAction(prevState, queryData) {
  const t = await getTranslations();
  const name = queryData.get("name");
  const email = queryData.get("email");
  const phone = queryData.get("phone");
  const subject = queryData.get("subject");
  const message = queryData.get("message");
  const reqBody = {
    name,
    email,
    phone,
    subject,
    message,
  };

  try {
    const res = await axiosInstance.post(`/homefix/contact-us`, reqBody);
    if (res.data.code === 200) {
      revalidatePath("/contactus");
      return { success: t("messageSentSuccessfully") };
    } else {
      return { error: t("someThingWentWrong") };
    }
  } catch (error) {
    return { error: `netWork ${t("someThingWentWrong")}` };
  }
}
