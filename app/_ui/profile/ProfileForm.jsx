"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ImageUpload from "../form-elements/ImageUpload";
import InputField from "../form-elements/InputField";
import SelectField from "../form-elements/SelectedField";
import SubmitButton from "../form-elements/SubmitButton";
import * as yup from "yup";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import { useTranslations } from "use-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useGetCities from "@/app/_hooks/user/useGetCities";
import { useDispatch, useSelector } from "react-redux";
import { EditProfileAction } from "@/app/_lib/actions";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { setloginState } from "@/app/_redux/slices/loginStatus";
export default function ProfileForm() {
  const [showResetModal, setShowResetModal] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const { data: cities, isLoading } = useGetCities();
  const { user } = useSelector((state) => state.loginStatus.login);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid"))
      .length(9, t("validation.phoneInvalid")),
    city_id: yup.string().required(t("validation.cityRequired")),
    image: yup.mixed().required(t("validation.imageRequired")),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city_id: "",
      image: null,
      password: "",
      password_confirmation: "",
      current_password: "",
    },
  });

  useEffect(() => {
    if (user && cities) {
      setValue("name", user?.name || "");
      setValue("email", user?.email || "");
      setValue("phone", user?.phone || "");
      setValue("city_id", user?.city.id || "");
      setValue("image", user?.image || null);
    }
  }, [cities, user, setValue]);

  const onSubmit = async () => {
    const payload = {
      name: watch("name"),
      email: watch("email"),
      phone: watch("phone").startsWith("0")
        ? watch("phone")?.slice(1)
        : watch("phone"),
      city_id: watch("city_id"),
      password: watch("password"),
      _method: "put",
    };

    if (typeof watch("image") !== "string") {
      payload.image = watch("image")[0];
    }
    try {
      const res = await EditProfileAction(payload);
      if (res.code === 200) {
        router.push("/");
        toast.success(res?.message);
        dispatch(setloginState({ user: res.data }));
      } else {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong, please try again or contact us.");
    }
  };

  return (
    <>
      <Form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload
          error={errors?.image?.message}
          register={register}
          watch={watch}
        />

        <InputField
          label={t("auth.fullName")}
          {...register("name")}
          error={errors?.name?.message}
          name="name"
          type="text"
          icon="/icons/user.svg"
        />

        <InputField
          label={t("auth.phone")}
          disabled
          {...register("phone")}
          name="phone"
          type="tel"
          icon="/icons/phone.svg"
        />

        <InputField
          label={t("auth.email")}
          {...register("email")}
          error={errors?.email?.message}
          name="email"
          type="email"
          icon="/icons/email.svg"
        />

        <SelectField
          required
          loading={isLoading}
          loadingText={t("isLoading")}
          label={t("auth.city")}
          icon="/icons/email.svg"
          id="city_id"
          name="city_id"
          {...register("city_id")}
          error={errors?.city_id?.message}
          options={
            cities?.map((city) => ({
              name: city.name,
              value: city.id,
            })) || []
          }
        />

        <div className="question p-0 pt-2">
          <label htmlFor="wantChangePassword" className="change-password-btn">
            {t("auth.doYouWantChangePassword")}
          </label>
          <Form.Switch
            id="wantChangePassword"
            name="wantChangePassword"
            checked={showResetModal}
            onChange={() => setShowResetModal(!showResetModal)}
          />
        </div>

        <SubmitButton
          loading={isSubmitting}
          name={t("Services.confirm")}
          className="confirm-btn"
        />
      </Form>
      <ResetPasswordModal show={showResetModal} setShow={setShowResetModal} />
    </>
  );
}
