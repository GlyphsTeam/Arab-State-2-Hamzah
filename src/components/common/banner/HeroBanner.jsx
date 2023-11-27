import style from "../../../assets/style/common/banner.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Banner({ data }) {
  const [t, i18n] = useTranslation();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    // fade: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
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
  return (
    <div className={`${style.categoryContainer} `}>
      <Slider {...settings}>
        {data?.map((item, index) => (
          <Link to={item.url} target={item.url ? "blank" : "_self"} key={index}>
            <div className={style.categoryContainerDiv}>
              {item.type === "image" ? (
                <LazyLoadImage
                  src={item?.media}
                  alt="media_Image"
                  className={i18n.language === 'en' ? style.categoryImage : style.categoryImageAR}
                />
              ) : (
                <video
                  className={style.categoryImage}
                  loop
                  autoPlay
                  muted
                  disableRemotePlayback
                  playsInline=""
                  data-wf-ignore="true"
                  data-object-fit="cover"
                >
                  <source src={item?.image} type="video/mp4" />
                </video>
              )}
              <div className={i18n.language === 'en' ? style.bannerText : style.bannerTextAr}>
                <h1>{item?.title}</h1>
                <p className={style.par}>{item?.description}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
              </div>
              {item?.city && (
                <div className={style.cityDiv}>
                  <p className={style.par}>{item?.city}</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
export default Banner;