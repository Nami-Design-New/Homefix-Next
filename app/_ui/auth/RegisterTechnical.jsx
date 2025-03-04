import clientAxios from "@/app/_lib/clientAxios";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import TechnicalStepOne from "./TechnicalStepOne";
import TechnicalStepTwo from "./TechnicalStepTwo";

export default function RegisterTechnical({
  setFormType,
  watch,
  register,
  errors,
  handleSubmit,
  isSubmitting,
  step,
  setStep,
  reset,
}) {
  const t = useTranslations();

  const onSubmit = async () => {
    try {
      const res = await clientAxios.post("/auth/send-code", {
        phone: watch("phone"),
        country_code: watch("country_code"),
        type: "register",
      });

      if (res.data.code === 200) {
        setFormType("confirm-register");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error Sending OTP:", error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 ? (
          <TechnicalStepOne
            setFormType={setFormType}
            setStep={setStep}
            register={register}
            errors={errors}
            watch={watch}
            reset={reset}
            handleSubmit={handleSubmit}
          />
        ) : (
          <TechnicalStepTwo
            loading={isSubmitting}
            setStep={setStep}
            register={register}
            errors={errors}
            watch={watch}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </>
  );
}
