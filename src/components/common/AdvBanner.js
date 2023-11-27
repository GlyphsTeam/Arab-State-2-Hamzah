import style from "../../assets/style/common/advBanner.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function AdvBanner({ data }) {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
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
          <Link to= {item.url} key={index}>
          <div className={style.categoryContainerDiv}>
            <LazyLoadImage src={item.image} alt="ad" />
            <div className={style.categoryHeaderText}>
            </div>
          </div>
          </Link>
        ))}
      </Slider>

    </div>
  );
}
export default AdvBanner;