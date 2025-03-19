import ResetPasswordModal from "@/app/_ui/modals/ResetPasswordModal";
import BackButton from "@/app/_ui/order/BackButton";
import ProfileForm from "@/app/_ui/profile/ProfileForm";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) || { locale: "en" };
  return { title: locale === "ar" ? "تعديل الملف الشخصي" : "Edit Profile" };
}

export default async function page() {
  const t = await getTranslations();

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12 p-2">
            <h2 className="profile-title">
              <BackButton />
              {t("editProfile")}
            </h2>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
