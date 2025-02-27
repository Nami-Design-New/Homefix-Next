"use server";

import { revalidatePath } from "next/cache";
import axiosInstance from "./axiosInstance";
import { getTranslations } from "next-intl/server";

export async function sendMessageAction(prevState, queryData) {
  const t = await getTranslations("common");
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
