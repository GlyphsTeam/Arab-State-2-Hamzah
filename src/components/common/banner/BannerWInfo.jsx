import { useTranslation } from "react-i18next";
import style from "../../../assets/style/common/bannerWInfo.module.scss";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ButtonThree from '../../Buttons/ButtonThree';

const BannerWInfo = ({ data }) => {
  const [t, i18n] = useTranslation();
  return (
    <>

      {data?.slice(0, 1).map((item, index) => (
        <div className={style.mainDiv}>

          <LazyLoadImage className={style.hero} src={item?.media} alt="Hero" />

          <div className={style.infoDiv}>
            <LazyLoadImage className={`${style.square} ${i18n.language === 'ar' ? style.squareAr : ''}`} src={require('../../../assets/Images/common/heroSquare.png')} alt="Square" />

            <div className={style.articleDiv}>
              <h2 className={style.mainTitle}>
                {item?.title}
              </h2>

              <p className={style.description}>
                {item?.description && ReactHtmlParser(`${item?.description}`)}
              </p>

              <Link className={i18n.language === 'en' ? style.btnLink : style.btnLinkAr} to={'/about'}>
                <ButtonThree>
                  {t('Read More')}
                </ButtonThree>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </>
  )
}

export default BannerWInfo