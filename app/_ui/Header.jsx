import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import LanguageDropDown from "./header/LanguageDropDown";
import UserDropDown from "./header/UserDropDown";

export default async function Header() {
  const t = await getTranslations("common");

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
            <Link href="/">{t("home")}</Link>
            <Link href="/aboutus">{t("aboutus")}</Link>
            <Link href="/#services">{t("services")}</Link>
            <Link href="/contactus">{t("contactus")}</Link>
          </>
        </div>

        <div className="actions">
          <LanguageDropDown />
          <UserDropDown />
        </div>
      </nav>
    </header>
  );
}
