import NotificationList from "@/app/_ui/notifications/NotificationList";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function page() {
  const t = await getTranslations();

  return (
    <section className="notifications-container container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12 p-2">
          <h2 className="notifications-title mb-4">{t("notifications")}</h2>
          <NotificationList />
        </div>
      </div>
    </section>
  );
}
