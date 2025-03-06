"use client";
import { Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";
import { useTranslations } from "next-intl";

export default function ConfirmDeleteAccount({ show, setShow }) {
  const t = useTranslations();
  const loading = false;
  //   const dispatch = useDispatch();
  //   const { client } = useSelector((state) => state.clientData);

  //   const deleteAccount = async () => {
  //     setLoading(true);
  //     try {
  //       const deleteToken = await axiosInstance.delete(
  //         `/auth/users/${client.id}`
  //       );
  //       if (deleteToken.data.code === 200) {
  //         deleteCookie("token");
  //         deleteCookie("id");
  //         delete axiosInstance.defaults.headers.common["Authorization"];
  //         dispatch(logout());
  //         navigate("/");
  //         queryClient.clear();
  //         localStorage.setItem("userType", "client");
  //         toast.success(deleteToken.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during logout:", error);
  //       throw new Error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const deleteAccount = () => {};

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>{t("deleteAccountDesc")}</Modal.Header>
      <Modal.Body className="modal-body">
        <div className="d-flex flex-row gap-3 form">
          <button onClick={() => setShow(false)} className="cancelButton mt-1">
            {t("cancel")}
          </button>

          <SubmitButton
            name={t("deleteAccount")}
            loading={loading}
            onClick={deleteAccount}
            className="cancelButton danger mt-1"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
