"use client";
import { useTranslations } from "next-intl";
import { Modal } from "react-bootstrap";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import { useActionState, useState } from "react";
import { changeOrderStatusAction } from "@/app/_lib/actions";
import { toast } from "sonner";

export default function CancelOrder({ show, setShow, orderId }) {
  const t = useTranslations();
  const [cancelReason, setCancelReason] = useState("");
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      console.log(formData);
      try {
        const res = await changeOrderStatusAction(orderId, {
          status: "canceled",
          cancel_reason: formData.get("cancelReason"),
        });

        if (res.code === 200) {
          toast.success(res.message);
          setShow(false);
          setCancelReason("");
          return;
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        console.error(e);
        return { success: false };
      }
    },
    null
  );

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("cancelOrder")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" action={formAction}>
          <InputField
            as="textarea"
            placeholder={t("cancelReason")}
            value={cancelReason}
            name="cancelReason"
            onChange={(e) => setCancelReason(e.target.value)}
          />

          <SubmitButton
            name={t("confirmCancel")}
            disabled={!cancelReason}
            loading={isPending}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
