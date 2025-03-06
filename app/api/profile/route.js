import axiosInstance from "@/app/_lib/axiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) {
    {
      return NextResponse.json(
        { message: "No user logged in" },
        { status: 200 }
      );
    }
  }

  try {
    // get the user profile from the external backend with the token
    const res = await axiosInstance.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;

    // return the user, and token to the client to set them in state
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
