"use client";
import { logoutAction } from "@/app/_lib/actions";
import { setloginState } from "@/app/_redux/slices/loginStatus";
import { setShowAuthModal } from "@/app/_redux/slices/showAuthModal";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ConfirmDeleteAccount from "../modals/ConfirmDeleteAccount";

export default function UserDropDown() {
  const [show, setShow] = useState(false);
  const login = useSelector((state) => state.loginStatus.login);
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations();
  const handleShow = (e) => {
    if (!login?.user?.id) {
      e.preventDefault();
      dispatch(setShowAuthModal(true));
    }
  };
  const performLogout = async () => {
    try {
      const res = await logoutAction();
      if (res?.code === 200) {
        dispatch(setloginState({ user: null }));
        router.push("/");
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        {login?.user?.image ? (
          <Image
            className="user_img"
            width={40}
            height={40}
            src={login?.user?.image || ""}
            alt="user_alt"
          />
        ) : (
          <i className="fa-regular fa-user" onClick={handleShow}></i>
        )}
      </Dropdown.Toggle>

      {login?.user?.id && (
        <Dropdown.Menu>
          <Dropdown.Item as={Link} href="/edit-profile">
            {t("editProfile")}
          </Dropdown.Item>

          <Dropdown.Item as={Link} href="/notifications">
            {t("notifications")}
          </Dropdown.Item>

          <Dropdown.Item onClick={() => performLogout()}>
            {t("logout")}
          </Dropdown.Item>

          <Dropdown.Item onClick={() => setShow(true)}>
            {t("deleteAccount")}
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
      <ConfirmDeleteAccount show={show} setShow={setShow} />
    </Dropdown>
  );
}
