"use client";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Dropdown } from "react-bootstrap";

export default function LanguageDropDown() {
  const t = useTranslations("common");
  const pathname = usePathname();
  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <i className="fa-sharp fa-regular fa-globe"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} href={`/${pathname}`} locale="en">
          {t("english")}
        </Dropdown.Item>
        <Dropdown.Item as={Link} href={`/${pathname}`} locale="ar">
          {t("arabic")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
