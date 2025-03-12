"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubmitButton from "../form-elements/SubmitButton";
import AudioRecorder from "../form-elements/Record";
import { useTranslations } from "next-intl";
import MapSection from "../MapSection";

export default function ServiceForm({ serviceId }) {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    service_id: serviceId,
    address: "XW8P+V9 Amman, Jordan",
    latitude: 31.9632,
    longitude: 35.9304,
    description: "",
    images_list: [],
    voice: null,
    is_schedule: 0,
    schedule_date: "",
    schedule_time: "",
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const objects = files.map((file) => ({ file }));
    setFormData((prev) => ({
      ...prev,
      images_list: [...prev.images_list, ...objects],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images_list.length === 0 && !formData.voice) {
      toast.warning("Please upload images or voice.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const result = await uploadOrder(formData);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/my-orders");
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  return (
    <form className="col-lg-10" onSubmit={handleSubmit}>
      {/* Image Upload */}

      <div className="section">
        <label className="label-container">
          <img src="/icons/Frame1.svg" alt="icon" className="label-icon" />
          {t("Services.faultImages")}
        </label>

        <div className="image-upload">
          <label className="upload-btn">
            <img src="/icons/uploadimg.svg" alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </label>

          {formData.images_list.map((obj, index) => (
            <div key={index} className="image-preview">
              <img
                src={URL.createObjectURL(obj.file)}
                alt={`upload-${index}`}
              />
              <div className="remove-btn" onClick={() => removeImage(index)}>
                <span>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}

      <div className="section">
        <label className="label-container">
          <img src="/icons/Fram3.svg" alt="icon" className="label-icon" />
          {t("Services.faultDescription")}
        </label>
        <textarea
          name="description"
          placeholder={t("Services.writeHere")}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Map Section */}

      <MapSection formData={formData} setFormData={setFormData} />

      {/* Audio Recorder */}
      <div className="my-3">
        <AudioRecorder setFormData={setFormData} />
      </div>

      {/* schedule field */}
      <div className=" p-2">
        <div className="section flex-row justify-content-between">
          <label>{t("Services.requestScheduledAppointment")}</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="is_schedule"
              checked={formData.is_schedule === 1}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      {formData.is_schedule ? (
        <div className="col-lg-10 p-2 mb-2">
          <div className="date-time-container">
            <input
              type="time"
              name="schedule_time"
              required
              className="date-time-input"
              value={formData.schedule_time}
              onChange={handleChange}
            />
            <input
              type="date"
              name="schedule_date"
              required
              className="date-time-input"
              value={formData.schedule_date}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
      {/* Submit Button */}
      <div className="">
        <SubmitButton className="confirm-btn" name={t("Services.confirm")} />
      </div>

      {/* <ConfirmationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        loading={loading}
        handleConfirm={handleConfirm}
      /> */}
    </form>
  );
}
