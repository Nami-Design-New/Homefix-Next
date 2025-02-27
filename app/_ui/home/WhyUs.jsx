import { getTranslations } from "next-intl/server";

export default async function WhyUs() {
  const t = await getTranslations("features");

  const features = [
    {
      icon: "fa-solid fa-chart-column ",
      title: t("title1"),
      description: t("description1"),
    },
    {
      icon: "fa-solid fa-file-signature",
      title: t("title2"),
      description: t("description2"),
    },
    {
      icon: "fa-solid fa-list-check",
      title: t("title3"),
      description: t("description3"),
    },
  ];

  return (
    <section id="why-us" className="why-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 p-2" data-aos="fade-up">
            <div className="why-box">
              <h3>{t("whyTitle")}</h3>
              <p>{t("whyDesc")}</p>
            </div>
          </div>

          <div className="col-lg-8 p-2 d-flex align-items-stretch">
            <div className="row" data-aos="fade-up">
              {features.map((feature, index) => (
                <div className="col-xl-4 p-2" key={index} data-aos="fade-up">
                  <div className="icon-box ">
                    <i className={feature.icon}></i>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
