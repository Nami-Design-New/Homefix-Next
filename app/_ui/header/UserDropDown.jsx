"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setShowAuthModal } from "@/app/_redux/slices/showAuthModal";

export default function UserDropDown() {
  const [show, setShow] = useState(false);
  const isAuthed = false;
  const dispatch = useDispatch();
  const t = useTranslations();
  const handleShow = (e) => {
    // if (!isAuthed) {
    e.preventDefault();
    dispatch(setShowAuthModal(true));
    // }
  };
  const performLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        {/* <Image src="/icons/user.svg" alt="user_alt" width={20} height={20} /> */}
        <i className="fa-regular fa-user" onClick={handleShow}></i>
      </Dropdown.Toggle>
      {isAuthed && (
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href="/edit-profile">
            {t("editProfile")}
          </Dropdown.Item>

          <Dropdown.Item as={Link} href="/notifications">
            {t("notifications")}
          </Dropdown.Item>

          <Dropdown.Item onClick={performLogout}>{t("logout")}</Dropdown.Item>

          <Dropdown.Item onClick={() => setShow(true)}>
            {t("deleteAccount")}
          </Dropdown.Item>
        </Dropdown.Menu>
      )}{" "}
      {/* <ConfirmDeleteAccount show={show} setShow={setShow} /> */}
    </Dropdown>
  );
}
