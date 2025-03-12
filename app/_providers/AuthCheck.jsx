// components/AuthCheck.js
"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "../_redux/slices/showAuthModal";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";

export default function AuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const protectedRoutes = [
    "/order-service",
    "/notifications",
    "edit-profile",
    "my-orders",
    "/aboutus",
  ];

  const localeRegex = /^\/(ar|en)(\/.*)?$/;
  const match = pathname.match(localeRegex);
  const routeWithoutLocale = match ? match[2] || "/" : pathname;

  useEffect(() => {
    if (!protectedRoutes.includes(routeWithoutLocale)) return;
    fetch("/api/auth-status")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        if (!data.isAuthenticated) {
          dispatch(setShowAuthModal(true));
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        dispatch(setShowAuthModal(true));
      });
  }, [routeWithoutLocale, dispatch, protectedRoutes, router]);

  return null;
}
