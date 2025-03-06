"use client";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../_redux/slices/loginStatus";
import { toast } from "sonner";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function getUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.code === 200) {
        if (data?.data) {
          dispatch(setloginState({ user: data.data }));
        }
      }
    }
    getUser();
  }, [dispatch]);
  return children;
}
