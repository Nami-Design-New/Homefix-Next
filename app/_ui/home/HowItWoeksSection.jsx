import { getTranslations } from "next-intl/server";
import Image from "next/image";

const HowItWorksSection = async () => {
  const t = await getTranslations("howItWorks");
  const steps = [
    {
      icon: "fa-solid fa-plus",
      title: t("createRequest"),
      description: t("createRequestDesc"),
      delay: 100,
    },
    {
      icon: "fa-solid fa-bags-shopping",
      title: t("manageRequests"),
      description: t("manageRequestsDesc"),
      delay: 150,
    },
    {
      icon: "fa-solid fa-thumbs-up",
      title: t("chooseBestOffer"),
      description: t("chooseBestOfferDesc"),
      delay: 200,
    },
  ];

  const rightSteps = [
    {
      icon: "fa-solid fa-shop",
      title: t("startShopping"),
      description: t("startShoppingDesc"),
      delay: 100,
    },
    {
      icon: "fa-solid fa-file-signature",
      title: t("listServicesOrProducts"),
      description: t("listServicesOrProductsDesc"),
      delay: 150,
    },
    {
      icon: "fa-solid fa-comments",
      title: t("efficientCommunication"),
      description: t("efficientCommunicationDesc"),
      delay: 200,
    },
  ];
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container py-4">
        <h4 className="title text-center pt-3" data-aos="fade-up">
          {t("title")}
        </h4>
        <p className="subtitle text-center text-secondary-emphasis mb-5">
          {t("subtitle")}
        </p>
        <div className="row gap-lg-0 gap-5">
          <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
            <div className="row h-100 gap-lg-0 gap-3">
              {steps.map((step, index) => (
                <div className="col-12 d-flex align-items-center" key={index}>
                  <div className="h-card d-flex gap-2" data-aos="fade-up">
                    <div className="icon">
                      <i className={`fa-solid ${step.icon} fs-3 px-1`}></i>
                    </div>
                    <div className="text">
                      <h5>{step.title}</h5>
                      <p className="text-secondary-emphasis">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-12 text-center">
            <div className="mockup">
              <Image
                src="/images/works.webp"
                className="img-fluid"
                alt="mockup"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
            <div className="row h-100 gap-lg-0 gap-3">
              {rightSteps.map((step, index) => (
                <div className="col-12 d-flex align-items-center" key={index}>
                  <div className="h-card left d-flex gap-2" data-aos="fade-up">
                    <div className="icon">
                      <i className={`${step.icon} fs-3 px-1`}></i>
                    </div>
                    <div className="text">
                      <h5>{step.title}</h5>
                      <p className="text-secondary-emphasis">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
