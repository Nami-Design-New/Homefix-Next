"use client";
import useGetCities from "@/app/_hooks/user/useGetCities";
import { sendCodeAction } from "@/app/_lib/actions";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import InputField from "../form-elements/InputField";
import PasswordField from "../form-elements/PasswordField";
import PhoneInput from "../form-elements/PhoneInput";
import SelectField from "../form-elements/SelectedField";
import SubmitButton from "../form-elements/SubmitButton";

function UserRegister({
  setFormType,
  setShow,
  register,
  errors,
  handleSubmit,
  watch,
  isSubmitting,
  reset,
}) {
  const t = useTranslations();
  const { data: cities, isLoading } = useGetCities();

  const handleSendCode = async (formData) => {
    try {
      const res = await sendCodeAction(formData);
      if (res.code === 200) {
        setFormType("confirm-register");
        console.log(res.data);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.error("Error Sending OTP:", e);
    }
  };

  return (
    <>
      <div className="mb-2">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit(handleSendCode)}>
        <InputField
          label={t("auth.fullName")}
          placeholder={t("auth.fullName")}
          id="name"
          name="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <PhoneInput
          label={t("auth.phone")}
          id="phone"
          name="phone"
          placeholder={t("auth.phone")}
          {...register("phone")}
          countryCode={watch("country_code")}
          error={errors.phone?.message}
        />

        <InputField
          label={t("auth.email")}
          placeholder={t("auth.email")}
          id="email"
          name="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <SelectField
          loading={isLoading}
          loadingText={t("isLoading")}
          label={t("auth.city")}
          id="city_id"
          name="city_id"
          {...register("city_id")}
          error={errors.city_id?.message}
          options={
            cities?.map((city) => ({ name: city.name, value: city.id })) || []
          }
        />

        <PasswordField
          label={t("auth.password")}
          placeholder={t("auth.password")}
          id="password"
          name="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link href="/terms-and-conditions" onClick={() => setShow(false)}>
            {t("TermsConditions")}
          </Link>
        </span>

        <div className="d-flex gap-2">
          <div
            className="back_btn"
            onClick={() => {
              setFormType("login");
              reset();
            }}
          >
            <i className="fal fa-arrow-right"></i>
          </div>
          <SubmitButton name={t("auth.send")} loading={isSubmitting} />
        </div>
      </form>
    </>
  );
}

export default UserRegister;
