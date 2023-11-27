import React, { useState } from "react";
import style from "../../assets/style/states.module.scss";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
function StateDescription({ data, smallTitle }) {
  const [t] = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className={style.aboutUsContainer}>
      <React.Fragment>
        <div className={style.leftAboutInfo}>
          <p className={style.aboutUsSubTitle}>{smallTitle}</p>
          <h1>{data?.title}</h1>
          <p className={style.par}>
            {data?.description &&
              ReactHtmlParser(
                showFullDescription ? data?.description : `${data?.description.slice(0, 400)}...`
              )}
          </p>
          <div className={style.aboutUsBtnDiv}>
            <button className={style.button} role="button" onClick={toggleDescription}>
              {showFullDescription ? t("Read Less") : t("Read More")}
            </button>
          </div>
        </div>
        <div className={style.aboutUsImageContainer}>
          <LazyLoadImage src={data?.image} alt="State" />
        </div>
      </React.Fragment>
    </div>
  );
}

export default StateDescription;
