import { useTranslations } from "next-intl";
import { Form, Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";

export default function ConfirmationModal({
  open,
  onClose,
  isAgreed,
  setIsAgreed,
  handleConfirm,
  loading,
}) {
  const t = useTranslations();

  return (
    <>
      <Modal show={open} onHide={onClose} centered className="confirm-delete">
        <Modal.Header closeButton>
          <Modal.Title>{t("termsAndConditions")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <p>{t("termsText")}</p>

          <Form.Check
            type="checkbox"
            label={t("agreeToTerms")}
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
            className="form-check"
          />
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton
            className="confirm-btn"
            name={t("Services.confirm")}
            disabled={!isAgreed}
            onClick={handleConfirm}
            loading={loading}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
