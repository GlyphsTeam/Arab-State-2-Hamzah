import About from "../components/home/about/AboutUs";
import TryApp from "../components/home/tryApp/TryApp";
import useAxios from "../hooks/useAxiosGet";
import EasySearch from "../components/common/EasySearch";
import AllCategoryList from "../components/home/category/AllCategoryList";
import style from "../assets/style/homePage/home.module.scss";
import CitySection from "../components/multiCityComponent/citySection/CityList";
import BannerWInfo from "../components/common/banner/BannerWInfo";
import { Helmet } from "react-helmet";

function Home({ baseURL }) {
  let urlId;
  const url = `home`;
  const [Data] = useAxios(url);
  const homeData = Data?.data;
  console.log("homeDate>>>4",homeData)
  return (
    <>
    <Helmet>
      <title>{homeData?.hero[0]?.title}</title>
      <meta name="description" content={homeData?.hero[0]?.description}/>
    </Helmet>

<BannerWInfo data={homeData?.hero} />

      {homeData?.cities && (
            <CitySection data = {homeData?.cities}/>
        )}

      <About data={homeData?.about} />
      <div className={style.homeState}>
        <p className={style.smallTitle}>{homeData?.states?.sub_title}</p>
        <h2 className={style.mainTitle}>{homeData?.states?.title}</h2>
        <AllCategoryList data={homeData?.states} urlId={urlId} />
      </div>
      <TryApp data={homeData?.try_app} />
      <EasySearch data={homeData?.easy_search} />
    </>
  );
}

export default Home;
