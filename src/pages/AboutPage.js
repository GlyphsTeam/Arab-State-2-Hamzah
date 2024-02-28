import style from "../assets/style/about/about.module.scss";
import { Helmet } from "react-helmet";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAboutData } from '../redux/About/about';
import { setLoading } from '../redux/slices/login';
import axios from 'axios'
import { useTranslation } from "react-i18next";

const AboutImage = lazy(() => import("../components/aboutUs/AboutImage"));
const AboutParagraph = lazy(() => import("../components/aboutUs/AboutParagraph"));
const UserAnalytics = lazy(() => import("../components/aboutUs/UserAnalytics"));
const HeroBanner = lazy(() => import("../components/common/banner/HeroBanner"));
const PlacesToVisitSection = lazy(() => import("../components/blog/PlacesToVisitSection"));
const DiscoverService = lazy(() => import("../components/common/DiscoverService"));
const SpinnerStatic = lazy(() => import("../components/common/Spinner"));
function AboutPage() {
  const aboutRedux = useSelector((state) => state.about.aboutData)
  const url = `about`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getAboutData = async () => {
    const token = localStorage.getItem("arab_user_token");
    let cityIdUrl = '/0';
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}${cityIdUrl}`;
    if (aboutRedux === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }

      }).then((res) => {
        dispatch(setAboutData(res.data?.data))
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getAboutData();
  }, []);
  return (
    <>
      <Helmet>
        <title>{aboutRedux?.slider[0].title}</title>
        <meta name="description" content={aboutRedux?.main?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <HeroBanner data={aboutRedux?.slider} />

        <div className={`${style.aboutUsMain}`}>
          <div className={`container`}>
            <div className={`row`}>
              <AboutParagraph aboutData={aboutRedux} />
              <AboutImage aboutData={aboutRedux} />
            </div>
          </div>
          <UserAnalytics aboutData={aboutRedux?.statistics} />
          <DiscoverService data={aboutRedux?.our_services} />
          <div className="px-5">
            <PlacesToVisitSection data={aboutRedux?.blogs} />
          </div>

        </div>
      </Suspense>
    </>
  );
}

export default AboutPage;
