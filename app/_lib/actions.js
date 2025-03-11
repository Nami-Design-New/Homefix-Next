"use server";

import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API_URL } from "../_utils/constants";
import axiosInstance from "./axiosInstance";

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

export async function sendCodeAction(formData, type) {
  const t = await getTranslations();
  const { phone, country_code } = formData;
  const reqBody = {
    phone,
    country_code,
    type,
  };
  const res = await axiosInstance.post("/auth/send-code", reqBody);
  console.log(res);

  return res.data;
}

// Confirm Code Action

export async function verifyOtpAction(phone, country_code, code) {
  try {
    const response = await axiosInstance.post("/auth/confirm-code", {
      phone,
      country_code,
      type: "register",
      code,
    });

    if (response.data.code === 200) {
      console.log(response);
      return { success: true };
    } else {
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
    const response = await axiosInstance.post("/auth/users", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.code === 200) {
      return { success: true, message: response.data.message };
    } else {
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
