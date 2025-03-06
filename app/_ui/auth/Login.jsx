import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PasswordField from "../form-elements/PasswordField";
import PhoneInput from "../form-elements/PhoneInput";
import SubmitButton from "../form-elements/SubmitButton";
import { toast } from "sonner";
import { setShowAuthModal } from "@/app/_redux/slices/showAuthModal";
import { useRouter } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "@/app/_redux/slices/loginStatus";

export default function Login({ setFormType, userType, setUserType }) {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginStatus.login);

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required(t("validation.phoneRequired"))
      .matches(/^7\d{8}$/, t("validation.phoneInvalid"))
      .length(9, t("validation.phoneInvalid")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(8, t("validation.passwordMinLength"))
      .matches(/[A-Z]/, t("validation.passwordCapitalLetter"))
      .matches(/[a-z]/, t("validation.passwordSmallLetter")),
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
      phone: "",
      password: "",
      country_code: "+962",
      type: userType,
    },
  });

  useEffect(() => {
    setValue("type", userType);
  }, [userType, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.code === 200) {
        toast.success(data.message);
        dispatch(setloginState({ token: data.data.token, user: data.data }));
        dispatch(setShowAuthModal(false));
        router.push("/");
        localStorage.setItem("userType", userType);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.loginTitle")} <span>{t("HomeFix")}</span>
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
      </div>

      <div className="input-field mb-4">
        <div className="radios">
          {["client", "provider"].map((type) => (
            <label key={type} htmlFor={type}>
              <input
                type="radio"
                name="userState"
                id={type}
                value={type}
                checked={userType === type}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className={userType === type ? "active" : ""}>
                {t(`auth.${type === "client" ? "client" : "technical"}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <PhoneInput
          label={t("auth.phone")}
          placeholder={t("auth.phone")}
          id="phone"
          countryCode={watch("country_code")}
          error={errors.phone?.message}
          {...register("phone")}
        />

        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <span
          className="forgetpass"
          style={{ cursor: "pointer" }}
          onClick={() => setFormType("forget")}
        >
          {t("auth.forgetPassword")}
        </span>

        <SubmitButton name={t("auth.login")} loading={isSubmitting} />

        <p className="noAccount">
          {t("auth.dontHaveAccount")}{" "}
          <span
            onClick={() =>
              setFormType(
                userType === "client" ? "register" : "register-technical"
              )
            }
          >
            {t("auth.createAccount")}
          </span>
        </p>
      </Form>
    </>
  );
}
