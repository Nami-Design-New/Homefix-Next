"use client";

import React from "react";
import { Modal } from "react-bootstrap";

export default function AuthModal() {
  return (
    <Modal centered show={show} className="authModal" backdrop="static">
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={() => {
            dispatch(setShowAuthModal(false));
            navigate("/");
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
