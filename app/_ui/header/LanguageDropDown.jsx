"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Dropdown } from "react-bootstrap";

export default function LanguageDropDown() {
  const t = useTranslations("common");
  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <i className="fa-sharp fa-regular fa-globe"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} href="/" locale="en">
          {t("english")}
        </Dropdown.Item>
        <Dropdown.Item as={Link} href="/" locale="ar">
          {t("arabic")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
