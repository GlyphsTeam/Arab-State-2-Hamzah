import { lazy, Suspense, useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setHomeData } from '../redux/Home/home'
import { setLoading } from '../redux/slices/login';
import style from "../assets/style/homePage/home.module.scss";
import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";
const About = lazy(() => import("../components/home/about/AboutUs"));
const TryApp = lazy(() => import("../components/home/tryApp/TryApp"));
const EasySearch = lazy(() => import("../components/common/EasySearch"));
const AllCategoryList = lazy(() => import("../components/home/category/AllCategoryList"));
const CitySection = lazy(() => import("../components/multiCityComponent/citySection/CityList"));
const BannerWInfo = lazy(() => import("../components/common/banner/BannerWInfo"));
const SpinnerStatic = lazy(() => import("../components/common/Spinner"));
function Home() {
  let urlId;
  const url = `home`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const homeRedux = useSelector((state) => state.home.homeData);
  const getHomeDate = async () => {
    let cityIdUrl = '/0';
    const token = localStorage.getItem("arab_user_token");
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}${cityIdUrl}`;
    if (homeRedux === null) {
      dispatch(setLoading(true));

      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {

        dispatch(setHomeData(res.data?.data));
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getHomeDate();
  }, []);

  console.log("homeRedux>>>", homeRedux)
  return (
    <>
      <Helmet>
        <title>{homeRedux?.hero[0]?.title}</title>
        <meta name="description" content={homeRedux?.hero[0]?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <BannerWInfo data={homeRedux?.hero} />

        {homeRedux?.cities && (
          <CitySection data={homeRedux?.cities} />
        )}

        <About data={homeRedux?.about} />
        <div className={style.homeState}>
          <p className={style.smallTitle}>{homeRedux?.states?.sub_title}</p>
          <h2 className={style.mainTitle}>{homeRedux?.states?.title}</h2>
          <AllCategoryList data={homeRedux?.states} urlId={urlId} />
        </div>
        <TryApp data={homeRedux?.try_app} />
        <EasySearch data={homeRedux?.easy_search} />
      </Suspense>
    </>
  );
}

export default Home;
