import JobCard from "../../components/common/cards/JobCard";
import HousingCard from "../../components/common/cards/HousingCard";
import ProductCard from "../../components/common/cards/ProductCard";
import style from "../../assets/style/userProfile/userProfile.module.scss";
import { useTranslation } from "react-i18next";

function UserPostsSection({ savedData, type, baseUrl }) {
  const [t] = useTranslation();

  return (
    <>
      {type === "house" && (
        <div className={`row `}>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <HousingCard
                key={index}
                houseData={item}
                isMyPost={true}
                baseUrl={baseUrl}
              />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}
      {type === "job" && (
        <div className={`row mb-3 ${style.savedJobRow}`}>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <JobCard
                key={index}
                jobData={item}
                isMyPost={true}
                baseUrl={baseUrl}
              />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}

      {type === "product" && (
        <div className={`row mt-5 mb-3 ${style.savedJobRow}`}>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <ProductCard
                key={index}
                data={item}
                isMyPost={true}
                baseUrl={baseUrl}
              />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UserPostsSection;
