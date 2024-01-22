import React from "react";
import style from "../../../assets/style/homePage/aboutUs.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ButtonThree from "../../Buttons/ButtonThree";
function AboutUs({ data }) {
  const [t] = useTranslation();
  return (
    <div className={style.aboutUsContainer}>
      {/* {aboutData?.slice(0,1).map((item, index) => ( */}
      <React.Fragment>
        <div className={style.leftAboutInfo}>
          <p className={style.aboutUsSubTitle}>{data?.small_title}</p>
          <h1>{data?.title}</h1>
          <p>{data?.description && ReactHtmlParser(`${data?.description}`)}</p>
          {/* <p>{data?.description}</p> */}
          <div className={style.aboutUsBtnDiv}>
            <Link to={"/About"}>
              <ButtonThree>
                {t("Read More")}
              </ButtonThree>
            </Link>
          </div>
        </div>
        <div className={style.aboutUsImageContainer}>
          <LazyLoadImage src={data?.image} alt="aboutUsIMage" />
        </div>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}

export default AboutUs;
