"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

export default function OrderTaps() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("current");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setActiveTab(searchParams.get("type") || "current");
  }, [searchParams]);

  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="tabs">
      <button
        className={activeTab === "current" ? "active" : ""}
        onClick={() => updateSearchParams("type", "current")}
      >
        {t("current")}
      </button>
      <button
        className={activeTab === "previous" ? "active" : ""}
        onClick={() => updateSearchParams("type", "previous")}
      >
        {t("previous")}
      </button>
    </div>
  );
}
