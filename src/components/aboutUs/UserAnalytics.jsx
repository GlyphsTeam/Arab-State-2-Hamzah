import React, { useEffect } from "react";
import style from "../../assets/style/about/userAnalytics.module.scss";
import Slider from "react-slick";
import {  useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdBusinessCenter } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiDevicePhoneMobile } from "react-icons/hi2";

const UserAnalytics = ({ aboutData }) => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  // const Box = ({ num }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  // };

  return (
    <>
        <div
          className={style.userAnalyticsContainer}
          style={{ backgroundImage: `url(${aboutData?.image})` }}
        >
          <div className={style.userAnalyticsText}>
            <div className={style.userAnalyticsCard}>
              <MdBusinessCenter/>
              <p className={style.parg}>{aboutData?.businesses}</p>
              <h5 className={style.titleCard}>{aboutData?.title_businesses}</h5>
            </div>

            <div className={style.userAnalyticsCard}>
              <FaUsers/>
              <p className={style.parg}>{aboutData?.users}</p>
              <h5 className={style.titleCard}>{aboutData?.title_users}</h5>
            </div>

            <div className={style.userAnalyticsCard}>
              <HiDevicePhoneMobile/>
              <p className={style.parg}>{aboutData?.verified_users}</p>
              <h5 className={style.titleCard}>{aboutData?.title_verified_users}</h5>
            </div>
          </div>

          <div className={style.userAnalyticsTextMobile}>
            <Slider {...settings}>
              {/* {userAnalyticsDataArr?.map((item, index) => ( */}
              <div className={style.userAnalyticsCard}>
                <MdBusinessCenter/>
                <p className={style.parg}>{aboutData?.businesses}</p>
                <h5 className={style.titleCard}>{aboutData?.title_businesses}</h5>
              </div>
              <div className={style.userAnalyticsCard}>
                <FaUsers/>
                <p className={style.parg}>{aboutData?.users}</p>
                <h5 className={style.titleCard}>{aboutData?.title_users}</h5>
              </div>

              <div className={style.userAnalyticsCard}>
                <HiDevicePhoneMobile/>
                <p className={style.parg}>{aboutData?.verified_users}</p>
                <h5 className={style.titleCard}> {aboutData?.title_verified_users}</h5>
              </div>
            </Slider>
          </div>
        </div>
    </>
  );
};

export default UserAnalytics;
