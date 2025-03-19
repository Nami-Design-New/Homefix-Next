import DownLoadApp from "@/app/_ui/home/DownLoadApp";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
export async function generateMetadata({ params }) {
  const { locale } = (await params) || { locale: "en" };
  return { title: locale === "ar" ? "عن هومفيكس" : "About HomeFix" };
}

export default async function Page({ params }) {
  const myparams = await params;
  console.log(myparams);

  const t = await getTranslations("aboutUs");
  return (
    <>
      <Container className="about-us">
        <Row>
          <Col md={7} className="text-content">
            <h2>{t("title")}</h2>
            <p>{t("description")}</p>

            <h3>{t("howItWorksTitle")}</h3>
            <ul>
              <li>{t("step1")}</li>
              <li>{t("step2")}</li>
              <li>{t("step3")}</li>
              <li>{t("step4")}</li>
            </ul>

            <h3>{t("featuresTitle")}</h3>
            <ul>
              <li>{t("feature1")}</li>
              <li>{t("feature2")}</li>
              <li>{t("feature3")}</li>
              <li>{t("feature4")}</li>
              <li>{t("feature5")}</li>
            </ul>

            <p className="final-message">{t("finalMessage")}</p>
          </Col>

          <Col md={5} className="image-content">
            <img src="/images/works.webp" alt="Download App" />
          </Col>
        </Row>
      </Container>

      <DownLoadApp />
    </>
  );
}
