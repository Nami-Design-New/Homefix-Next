import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  //   const { client } = useSelector((state) => state.clientData);
  const t = await getTranslations("common");
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-12 p-2">
            <div className="col">
              <Link href="/" className="logo">
                <Image
                  src={"/images/logo.svg"}
                  width={125}
                  height={48}
                  alt="logo"
                  priority
                />
              </Link>
              <p>{t("footerTitle")}</p>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("support")}</h5>
              <div className="links">
                <Link href="/contact">{t("contactus")}</Link>
                <Link href="/help">{t("help")}</Link>
                <Link href="/cancellation-policy">
                  {t("cancellationPolicy")}
                </Link>
                <Link href="/faqs">{t("faqs")}</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("quickLinks")}</h5>
              <div className="links">
                <Link href="/">{t("home")}</Link>
                <Link href="/about">{t("aboutus")}</Link>
                <Link href="/services">{t("services")}</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <div className="col">
              <h5>{t("downloadApp")}</h5>

              <div className="btns">
                <Link
                  aria-label="Apple App"
                  href="https://apps.apple.com/app/home-fix-technical/id6740774757"
                  target="_blank"
                >
                  <img src="/icons/appStore.svg" alt="" />
                </Link>
                <Link
                  aria-label="Android App"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.apps.homefix"
                >
                  <img src="/icons/playStore.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <div className={`copy_rights`}>
              <p>
                &copy; {new Date().getFullYear()} {t("copyright")}
                <Link href="/"> {t("HomeFix")} </Link>
              </p>

              <div className="follow">
                <div className="social_media">
                  <Link href="https://www.facebook.com">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link href="https://wa.me/9620791729798">
                    <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                  <Link href="https://www.instagram.com/homefixservices/#">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link href="/">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
