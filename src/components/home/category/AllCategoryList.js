import Slider from "react-slick";
import style from "../../../assets/style/homePage/categoryList.module.css";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

function AllCategoryList({ data, type, dir, urlId }) {
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className={style.customNextArrow} onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={style.customPrevArrow} onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }

  const CardList = data?.model.map((item) => (
    <Link
      key={item.id}
      to={item?.url}
      state={(urlId = { id: item?.id })}
      className={style.navLink}
    >
      <CategoryCard title={item?.title} id={item?.id} image={item?.image} />
    </Link>
  ));

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    rows: 2,
    slidesPerRow: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 380,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  return (
    <div className={style.AllCategoryContainer}>
      <Slider className="categoryHomePage" {...settings}>
        {CardList}
      </Slider>
    </div>
  );
}

export default AllCategoryList;
