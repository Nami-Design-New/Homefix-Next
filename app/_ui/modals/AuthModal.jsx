"use client";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import * as yup from "yup";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Login from "../auth/Login";
import { setShowAuthModal } from "@/app/_redux/slices/showAuthModal";
import UserRegister from "../auth/UserRegister";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterTechnical from "../auth/RegisterTechnical";
import ConfirmRegister from "../auth/ConfirmRegister";
import ForgetPassword from "../auth/ForgetPassword";

export default function AuthModal() {
  const { show } = useSelector((state) => state.showAuthModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations();

  const [formType, setFormType] = useState("login");
  const [userType, setUserType] = useState("client");
  const [step, setStep] = useState(1);

  const registerSchema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid"))
      .length(9, t("validation.phoneInvalid")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
    city_id: yup.string().required(t("validation.cityRequired")),
  });

  const technicalStepOneSchema = yup.object().shape({
    name: yup.string().required(t("validation.nameRequired")),
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid"))
      .length(9, t("validation.phoneInvalid")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
    city_id: yup.string().required(t("validation.cityRequired")),
    specialty_id: yup.string().required(t("validation.specialtyRequired")),
  });

  const technicalStepTwoSchema = yup.object().shape({
    image: yup.mixed().required(t("validation.imageRequired")),
    front_national_image: yup.mixed().required(t("validation.imageRequired")),
    back_national_image: yup.mixed().required(t("validation.imageRequired")),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      userType === "client"
        ? registerSchema
        : step === 1
        ? technicalStepOneSchema
        : technicalStepTwoSchema
    ),

    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      city_id: "",
      country_code: "+962",
      specialty_id: "",
      image: null,
      front_national_image: null,
      back_national_image: null,
    },
  });

  return (
    <Modal centered show={show} className="authModal" backdrop="static">
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={() => {
            dispatch(setShowAuthModal(false));
            router.push("/");
            setFormType("login");
            setUserType("client");
          }}
        >
          <i className="fa-regular fa-x"></i>
        </button>

        <section className="auth_section">
          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && (
              <Login
                userType={userType}
                setFormType={setFormType}
                setUserType={setUserType}
              />
            )}

            {formType === "register" && (
              <UserRegister
                setFormType={setFormType}
                setShow={() => dispatch(setShowAuthModal(false))}
                register={register}
                errors={errors}
                watch={watch}
                reset={reset}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {formType === "register-technical" && (
              <RegisterTechnical
                setFormType={setFormType}
                register={register}
                errors={errors}
                watch={watch}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                step={step}
                reset={reset}
                setStep={setStep}
              />
            )}

            {formType === "confirm-register" && (
              <ConfirmRegister
                data={
                  userType === "client"
                    ? {
                        name: watch("name"),
                        phone: watch("phone"),
                        email: watch("email"),
                        password: watch("password"),
                        city_id: watch("city_id"),
                        country_code: watch("country_code"),
                        type: "client",
                      }
                    : {
                        name: watch("name"),
                        phone: watch("phone"),
                        email: watch("email"),
                        password: watch("password"),
                        city_id: watch("city_id"),
                        country_code: watch("country_code"),
                        type: "provider",
                        specialty_id: watch("specialty_id"),
                        image: watch("image")[0],
                        front_national_image: watch("front_national_image")[0],
                        back_national_image: watch("back_national_image")[0],
                      }
                }
                watch={watch}
                userType={userType}
                setFormType={setFormType}
              />
            )}

            {formType === "forget" && (
              <ForgetPassword setFormType={setFormType} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
