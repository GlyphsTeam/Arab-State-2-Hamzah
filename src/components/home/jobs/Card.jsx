import { Link } from "react-router-dom";
import style from "../../../assets/style/homePage/job.module.css";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Card({ data }) {
  const [t] = useTranslation();

  return (
    <>
      {data && (
        <div className={`col-sm-4 col-md-4 ${style.colCenter}`}>
          <Link state={({ type: '' })} to={data?.link} className={style.navLink}>
            <div className={style.jobCard}>
              <div className={style.jobDivTitle}>
                <h2 className={style.cardTitle}>{data?.title}</h2>
              </div>
              <LazyLoadImage
                className={style.jobSectionImg}
                src={data?.image}
                alt="Card cap"
              />
              <div className={style.descriptionParagraphDiv}>
                <p className={style.cardParagraph}>{data?.description}</p>
                <h2 className={style.cardText}>{t("find more")}</h2>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default Card;
