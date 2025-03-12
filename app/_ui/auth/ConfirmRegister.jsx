import clientAxios from "@/app/_lib/clientAxios";
import { useEffect, useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import OtpContainer from "../form-elements/OtpContainer";
import SubmitButton from "../form-elements/SubmitButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { setloginState } from "@/app/_redux/slices/loginStatus";
import { setShowAuthModal } from "@/app/_redux/slices/showAuthModal";
import { useRouter } from "next/navigation";
import {
  loginUserAction,
  registerUser,
  registerUserAction,
  verifyOtp,
  verifyOtpAction,
} from "@/app/_lib/actions";

export default function ConfirmRegister({
  data,
  watch,
  userType,
  setFormType,
}) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  // const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [loading, startTransition] = useTransition();
  const [resendDisabled, setResendDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const verifyResult = await verifyOtpAction(
        watch("phone"),
        watch("country_code"),
        code
      );
      if (!verifyResult.success) {
        toast.error(verifyResult.message);
        return;
      }
      const registerResult = await registerUserAction(data);
      if (!registerResult.success) {
        toast.error(registerResult.message);
        return;
      }
      const loginPayload = {
        phone: watch("phone"),
        password: watch("password"),
        type: data?.type,
        country_code: watch("country_code"),
      };
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(loginPayload),
        });
        const data = await res.json();

        if (data.code === 200) {
          toast.success(data.message);
          dispatch(setloginState({ token: data.data.token, user: data.data }));
          dispatch(setShowAuthModal(false));
          setFormType("login");
          router.push("/");
          localStorage.setItem("userType", userType);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleResend = async () => {
    startTransition(async () => {
      try {
        const res = await clientAxios.post("/auth/send-code", {
          phone: watch("phone"),
          country_code: watch("country_code"),
          type: "register",
        });

        if (res.data.code === 200) {
          toast.success(res.data.message);
          setTimer(60);
          setResendDisabled(true);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong, please try again.");
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">
          {t("auth.resetPasswordDesc")} <b>{watch("phone")}</b>
        </p>
      </div>

      <OtpContainer setCode={setCode} />

      <div className="resend-code">
        <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
          {t("auth.didnotReceiveCode")}
          <span
            className=""
            style={{ cursor: "pointer" }}
            onClick={handleResend}
          >
            {t("auth.resendCode")}
          </span>
        </span>
        <div
          className="timer flex-row-reverse"
          style={{ justifyContent: "end !important" }}
        >
          <span>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
          </span>
          :<span>{(timer % 60).toString().padStart(2, "0")}</span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mt-2">
        <div
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType(
              userType === "provider" ? "register-technical" : "register"
            );
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </div>

        <SubmitButton name={t("auth.confirm")} loading={loading} />
      </div>
    </form>
  );
}
