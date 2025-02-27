import React from "react";
import { Link } from "@/i18n/routing";
import { Col, Container, Row } from "react-bootstrap";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function DownLoadApp() {
  const t = await getTranslations("common");
  return (
    <Container>
      <Row className="p-2">
        <div className="download-app">
          <Row className="align-items-center">
            <Col md={6} className="image-content">
              <img src="/images/iPhone2 Pro.png" alt="downloadapp image" />
            </Col>
            <Col md={6} className="text-content">
              <h2>
                {t("Download")}{" "}
                <span className="highlight">{t("HomeFix")} </span>
                {t("App From Your Gadget")}
              </h2>
              <p>
                {t("Download the app to explore deals and ease of booking")}
              </p>
              <div className="download-buttons">
                <Link
                  aria-label="Android App"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.apps.homefix"
                >
                  <img
                    src="/icons/playStore.svg"
                    alt="Google Play"
                    className="store-button"
                  />
                </Link>

                <Link
                  aria-label="Apple App"
                  href="https://apps.apple.com/app/home-fix-technical/id6740774757"
                  target="_blank"
                >
                  <Image
                    src="/icons/appStore.svg"
                    alt="App Store"
                    className="store-button"
                    height={40}
                    width={135}
                  />
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}
