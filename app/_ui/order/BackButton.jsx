"use client";
import { useRouter } from "@/i18n/routing";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <i className="fa-regular fa-angle-right"></i>
    </button>
  );
}
