import style from "../../../assets/style/common/lookingFor.module.scss";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
function LookingFor({ data, pageType }) {

    const [t, i18n] = useTranslation();
  return (
    <>
      <div className={`container ${style.container}`}>
        {data?.sections?.map((item, index) => (
          <div key={index} className={`row ${i18n.language === "en" ? style.mainDiv : style.mainDivAr}`}>
            <div className={`col-8 ${style.infoDiv}`}>
              <h2 className={style.lookingForTitle}>{item?.title}</h2>

              <p className={`${style.desc}`}>
                {item?.web_description && ReactHtmlParser(`${item.web_description}`)}
              </p>

              <div className={style.divBtns}>
                {console.log(item.url)}
                {item.type === "jobs" ? (
                  <>
                    <Link className={style.postLink} to={item.create_url}>
                      + Add Post
                    </Link>
                    <Link  state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                      Posted Jobs
                    </Link>
                  </>
                ) : item.type === "employees" ? (
                  <>
                    <Link className={style.postLink} to={item.create_url}>
                      + Add Post
                    </Link>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                    Posted Employees

                    </Link>
                  </>
                ) : item.type === "rent" ? (
                  <>
                    <Link className={style.postLink} to={item.create_url}>
                      + Add Post
                    </Link>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                    Posted Appartment

                    </Link>
                  </>
                ) : (
                  <>
                    <Link className={style.postLink} to={item.create_url}>
                      + Add Post
                    </Link>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                    Posted Accomodation
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className={`col-4`}>
              <LazyLoadImage
                className={`${style.img}`}
                src={item?.image}
                alt="Looking For"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LookingFor;
