import style from "../../../assets/style/homePage/tryApp.module.scss";
import { useTranslation } from "react-i18next";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io";

import ReactHtmlParser from "html-react-parser";

function TryApp({ data }) {
  const { t, i18n } = useTranslation();
  




  return (
   

      <div style={{backgroundImage: `url(${data?.image})`}} className={` ${style.tryAppMainContainer} `}>
      <div
        className={
          i18n.language === "en"
            ? style.tryAppContainer
            : style.tryAppContainerAr
        }
      >
        <div
          className={
            i18n.language === "en" ? style.tryAppSubDiv : style.tryAppSubDivAr
          }
        >
          <div className={style.tryAppInfo}>
            <div className={style.tryAppInfoTitle}>
              <h3>{data?.title}</h3>
            </div>
            <div className={style.tryAppBtnDiv}>
              <p className={style.tryAppParagraph}>{data?.web_description && ReactHtmlParser(data?.web_description)}</p>
              <div className={style.BtnDiv}>
              <a
                href={data?.android?.link}
                target="_blank"
                // className={
                //   i18n.language === "en"
                //     ? style.googlePlayBtn
                //     : style.googlePlayBtnAr
                // }
              >
                <div className={style.googlePlayContainer}>
                  <FaGooglePlay  className={style.tryIcon}/>
                  <div className={style.googlePlayDiv}>
                    <p>Available on the</p>
                    <p>Google Play</p>
                  </div>
                </div>
              </a>
              <a
                className={style.appleContainer}
                href={data?.ios?.link}
                target="_blank"
              >

                <div className={style.playStoreContainer}>
                <IoLogoApple className={style.tryIcon}/>
                  <div className={style.playStoreDiv}>
                    <p>Download on the</p>
                    <p>App Store</p>
                  </div>
                </div>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default TryApp;
