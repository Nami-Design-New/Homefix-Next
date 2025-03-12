"use client";
import Image from "next/image";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";
const PhoneInput = forwardRef(
  ({ label, error, countryCode, ...props }, ref) => {
    return (
      <div className="input-field">
        <label htmlFor={props.id}>{label}</label>
        <div className="phone_field">
          <Form.Control
            {...props}
            ref={ref}
            className="form-control"
            isInvalid={!!error}
            maxLength={9}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 9);
            }}
          />
          <div className="dropdown">
            {countryCode && (
              <div className="button">
                <div className="img">
                  <Image
                    src="/images/Flag_of_Jordan.svg"
                    width={28}
                    height={20}
                    alt="Jordan Flag"
                  />
                </div>
                <span>{countryCode}</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
