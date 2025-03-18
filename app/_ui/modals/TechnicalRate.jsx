"use client";
import { useTranslations } from "next-intl";
import React, { useActionState, useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import { rateTechnicalAction } from "@/app/_lib/actions";
import { toast } from "sonner";

export default function TechnicalRate({ show, setShow, orderDetails }) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    stars: 0,
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, stars: value + 1 }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const reqBody = {
      order_id: orderDetails?.id,
      provider_id: orderDetails?.technical?.id,
      stars: formData.stars,
      notes: formData.notes,
    };
    try {
      const res = await rateTechnicalAction(reqBody);
      if (res.code === 200) {
        setShow(false);
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("rateTechnical")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="star-rating-service">
            {Array.from({ length: 5 }).map((_, star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={formData?.stars === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label
                  htmlFor={`star${star}`}
                  title={`${star} stars`}
                  className={formData.stars >= star + 1 ? "active" : ""}
                >
                  <i className="fa-sharp fa-solid fa-star"></i>
                </label>
              </React.Fragment>
            ))}
          </div>

          <InputField
            as="textarea"
            placeholder={t("writeYourExperience")}
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />

          <SubmitButton
            loading={isLoading}
            name={t("send")}
            className="cancelButton m-0"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
