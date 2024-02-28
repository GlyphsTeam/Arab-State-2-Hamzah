import style from "../assets/style/statePage.module.scss"
import { Helmet } from "react-helmet";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { setCityData } from '../redux/City/city';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const Banner = lazy(() => import("../components/common/banner/HeroBanner"));
const StateDescription = lazy(() => import("../components/states/StateDescription"));
const CitySection = lazy(() => import("../components/multiCityComponent/citySection/CityList"));
const SpinnerStatic = lazy(() => import("../components/common/Spinner"));

const Cities = () => {
  let urlId;
  let statePageUrl = `city_page`;
  const titlePage = "Cities Page";
  const dispatch = useDispatch();
  const stateCity = useSelector((state) => state.city.cityData);
  const { t } = useTranslation();

  const getCityData = async () => {
    const token = localStorage.getItem("arab_user_token");
    let cityIdUrl = '/0';
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}${cityIdUrl}`;


    if (stateCity === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${statePageUrl}`,{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((res)=>{
        dispatch(setCityData(res.data?.data));
        dispatch(setLoading(false));
      
      }).catch((err)=>{
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(()=>{
    getCityData();
  },[]);

  return (
    <div>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={stateCity?.city_page?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <Banner data={stateCity?.slider} />
        <StateDescription
          data={stateCity?.city_page}
          smallTitle={stateCity?.sub_title}
        />

        <div className={style.stateDiv}>
          <h2 className={style.stateTitle}>{stateCity?.states?.title}</h2>


          <div className={style.cardsContainer}>

            <CitySection data={stateCity?.cities?.model} />


          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Cities;
