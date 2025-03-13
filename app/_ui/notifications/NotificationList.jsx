import axiosInstance from "@/app/_lib/axiosInstance";
import { getNotifications } from "@/app/_utils/apiServices/notifications";
import { getTranslations } from "next-intl/server";
import React from "react";
import DeleteNotificationButton from "./DeleteNotificationButton";

export default async function NotificationList() {
  const t = await getTranslations();
  const notifications = await getNotifications();
  function handleDelete(id) {}
  return (
    <>
      {notifications?.length > 0 ? (
        notifications?.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <span className="time">{notification.created_at}</span>
            </div>
            <DeleteNotificationButton id={notification.id} />
          </div>
        ))
      ) : (
        <p className="no-data">{t("noNotifications")}</p>
      )}
    </>
  );
}
