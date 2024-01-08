import style from "../assets/style/about/about.module.scss";
import useAxios from "../hooks/useAxiosGet";
import AboutImage from "../components/aboutUs/AboutImage";
import AboutParagraph from "../components/aboutUs/AboutParagraph"
import UserAnalytics from "../components/aboutUs/UserAnalytics";
import HeroBanner from "../components/common/banner/HeroBanner";
import PlacesToVisitSection from "../components/blog/PlacesToVisitSection";
import { Helmet } from "react-helmet";
import DiscoverService from "../components/common/DiscoverService";
function AboutPage() {

  const url = `about`;
  const [Data] = useAxios(url);
  const aboutData = Data?.data;
  return (
    <>
    <Helmet>
      <title>{aboutData?.slider[0].title}</title>
      <meta name="description" content={aboutData?.main?.description}/>
    </Helmet>
      <HeroBanner data={aboutData?.slider} />

      <div className={`${style.aboutUsMain}`}>
        <div className={`container`}>
          <div className={`row`}>
            <AboutParagraph aboutData={aboutData} />
            <AboutImage aboutData={aboutData} />
          </div>
        </div>
        <UserAnalytics aboutData={aboutData?.statistics} />
        <DiscoverService data={aboutData?.our_services}/>
        <div className="px-5">
          <PlacesToVisitSection data={aboutData?.blogs}/>
        </div>
       
      </div>
    </>
  );
}

export default AboutPage;
