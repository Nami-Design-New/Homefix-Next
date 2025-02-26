// import React from "react";
// import { getTranslations } from "next-intl/server";
// import Link from "next/link";
// import { Dropdown } from "react-bootstrap";

// export default async function UserDropDown() {
//   const isAuthed = true;
//   const t = await getTranslations("common");

//   return (
//     <Dropdown>
//       <Dropdown.Toggle className="rounded_btn">
//         <div>adas</div>
//         {/* {client?.image ? (
//           <img
//             className="user_img"
//             src={client?.image}
//             alt="user_alt"
//             onClick={handleShow}
//           />
//         ) : (
//           <img src="/icons/user.svg" alt="user_alt" onClick={handleShow} />
//         )} */}
//       </Dropdown.Toggle>

//       {isAuthed && (
//         <Dropdown.Menu>
//           <Dropdown.Item as={Link} href={"/edit-profile"}>
//             {t("editProfile")}
//           </Dropdown.Item>

//           {/* {localStorage.getItem("userType") === "client" && (
//             <Dropdown.Item as={Link} to={"/my-orders"}>
//               {t("myOrders")}
//             </Dropdown.Item>
//           )} */}

//           <Dropdown.Item as={Link} href={"/notifications"}>
//             {t("notifications")}
//           </Dropdown.Item>

//           <Dropdown.Item onClick={performLogout}>{t("logout")}</Dropdown.Item>

//           <Dropdown.Item onClick={() => setShow(true)}>
//             {t("deleteAccount")}
//           </Dropdown.Item>
//         </Dropdown.Menu>
//       )}

//       {/* <ConfirmDeleteAccount show={show} setShow={setShow} /> */}
//     </Dropdown>
//   );
// }

"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";

export default function UserDropDown() {
  const [show, setShow] = useState(false);
  const isAuthed = true;
  const t = useTranslations("common");

  const performLogout = () => {
    console.log("Logging out...");
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="rounded_btn">
        <Image
          src="/icons/user.svg"
          alt="user_alt"
          width={20}
          height={20}
          onClick={handleShow}
        />
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
      )}
    </Dropdown>
  );
}
