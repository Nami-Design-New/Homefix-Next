import axiosInstance from "@/app/_lib/axiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const res = await axiosInstance.post("auth/login", payload);
    const data = res.data;
    if (data.code !== 200) {
      return NextResponse.json(data);
    }
    const cookieStore = await cookies();
    const token = data?.data?.token;
    const userId = data?.data?.id;
    if (token) {
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
