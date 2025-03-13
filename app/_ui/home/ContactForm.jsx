"use client";

import { sendMessageAction } from "@/app/_lib/actions";
import { useActionState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useTranslations } from "use-intl";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import { toast } from "sonner";

const initialState = {};

export default function ContactForm() {
  const t = useTranslations("auth");
  const [state, formAction, isPending] = useActionState(
    sendMessageAction,
    null
  );
  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);
  const fields = [
    { name: "name", label: t("name"), type: "text", icon: "user" },
    { name: "email", label: t("email"), type: "email", icon: "email" },
    {
      name: "subject",
      label: t("subject"),
      type: "text",
      icon: "subject",
    },
    {
      name: "message",
      label: t("message"),
      type: "textarea",
      icon: "message",
      as: "textarea",
    },
  ];
  return (
    <div className="contact-container">
      <Form action={formAction} className="contact-form">
        {fields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            icon={`/icons/${field.icon}.svg`}
            required
            as={field?.as}
          />
        ))}
        <SubmitButton
          loading={isPending}
          name={t("send")}
          className="confirm-btn"
        />
      </Form>
    </div>
  );
}
