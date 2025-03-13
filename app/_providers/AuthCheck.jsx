"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "../_redux/slices/showAuthModal";

export default function AuthCheck() {
  const searchParams = useSearchParams();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("authModal") === "true") {
      dispatch(setShowAuthModal(true));
    }
  }, [searchParams, dispatch]);

  return null;
}
