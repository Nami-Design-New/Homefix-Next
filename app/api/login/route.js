import axiosInstance from "@/app/_lib/axiosInstance";
import { API_URL } from "@/app/_lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Received login request");
    const payload = await request.json();
    console.log("Payload:", payload);

    const res = await axiosInstance.post("auth/login", payload);
    const data = res.data;
    console.log("Response :", res.data);
    console.log("Response status:", res.status);

    if (data.code !== 200) {
      console.error("Error response from backend:" + data.message);
      return NextResponse.json(data);
    }

    const cookieStore = await cookies();
    const token = data?.data?.token;
    const userId = data?.data?.id;

    if (token) {
      console.log("Setting cookies...");
      cookieStore.set("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      cookieStore.set("id", String(userId), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
