import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const isAuthenticated = req.headers.get("x-authenticated") === "false";
  console.log(isAuthenticated);

  return NextResponse.json(
    { isAuthenticated: false, message: "You should log in" },
    { status: 401 }
  );
}
