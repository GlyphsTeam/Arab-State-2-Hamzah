import Banner from "../components/common/banner/HeroBanner";
import StateDescription from "../components/states/StateDescription";
import useAxios from "../hooks/useAxiosGet";
import style from "../assets/style/statePage.module.scss"
import CitySection from '../components/multiCityComponent/citySection/CityList'
import { Helmet } from "react-helmet";
const Cities = () => {
  let urlId;
  let statePageUrl = `city_page`;
  const [Data] = useAxios(statePageUrl);
  let statePageData = Data?.data;
  const titlePage="Cities Page";
console.log("stateData>>>",statePageData)
  return (
    <div>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={statePageData?.city_page?.description}/>
      </Helmet>
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
    </div>
  );
};

export default Cities;
