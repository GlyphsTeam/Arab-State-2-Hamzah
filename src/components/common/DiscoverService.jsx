import style from "../../assets/style/common/discoverService.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";

const DiscoverService = ({ data }) => {

  const [t, i18n] = useTranslation();


  return (
    <div className={style.discoverServiceContainer}>
      <div
        className={style.discoverServiceImageContainer}
        style={{ backgroundImage: `url(${data?.image})` }}
      ></div>
      <div className={style.discoverServiceText}>
        <h5>{data?.title}</h5>
        <p>{data?.web_description && ReactHtmlParser(data?.web_description)}</p>
        <Link to={data?.link}>
          <div className={i18n.language === "en" ? style.discoverServiceButton: style.discoverServiceButtonAr }>{t("Start Your Journey")}</div>
        </Link>
      </div>
    </div>
  );
};

export default DiscoverService;
