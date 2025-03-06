"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageDropDown from "./header/LanguageDropDown";
import UserDropDown from "./header/UserDropDown";
import { useSelector } from "react-redux";

export default function Header() {
  const t = useTranslations();
  const login = useSelector((state) => state.loginStatus.login);

  return (
    <header>
      <nav className="container">
        <Link href="/" className="logo">
          <Image
            src={"/images/logo.svg"}
            height={36}
            width={125}
            alt="logo"
            priority
          />
        </Link>

        <div className="nav_links">
          <>
            <Link href="/">
              {login?.user?.type === "technical" ? t("orders") : t("home")}
            </Link>
            <Link href="/aboutus">{t("aboutus")}</Link>

            {!login?.user || login?.user?.type === "client" ? (
              <Link href="/#services">{t("services")}</Link>
            ) : null}

            <Link href="/contactus">{t("contactus")}</Link>
          </>
        </div>

        <div className="actions">
          {login?.user?.id && (
            <Link href="/notifications" className="rounded_btn">
              {login?.user?.notifications > 0 && (
                <span>{login?.user?.notifications}</span>
              )}
              <i className="fa-regular fa-bell"></i>
            </Link>
          )}

          <LanguageDropDown />
          <UserDropDown />
        </div>
      </nav>
    </header>
  );
}
