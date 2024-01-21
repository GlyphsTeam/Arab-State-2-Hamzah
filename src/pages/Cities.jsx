import useAxios from "../hooks/useAxiosGet";
import style from "../assets/style/statePage.module.scss"
import { Helmet } from "react-helmet";
import { lazy, Suspense } from "react";
const Banner = lazy(()=>import("../components/common/banner/HeroBanner"));
const StateDescription = lazy(()=>import("../components/states/StateDescription"));
const CitySection = lazy(()=>import("../components/multiCityComponent/citySection/CityList"));
const SpinnerStatic = lazy(()=>import("../components/common/Spinner"));

const Cities = () => {
  let urlId;
  let statePageUrl = `city_page`;
  const [Data] = useAxios(statePageUrl);
  let statePageData = Data?.data;
  const titlePage="Cities Page";
  return (
    <div>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={statePageData?.city_page?.description}/>
      </Helmet>
      <Suspense fallback={<SpinnerStatic/>}>
      <Banner data={statePageData?.slider} />
      <StateDescription
        data={statePageData?.city_page}
        smallTitle={statePageData?.sub_title}
      />

      <div className={style.stateDiv}>
        <h2 className={style.stateTitle}>{statePageData?.states?.title}</h2>

      
      <div className={style.cardsContainer}>
      
      <CitySection data={statePageData?.cities?.model}/>

            
      </div>
      </div>
      </Suspense>
    </div>
  );
};

export default Cities;
