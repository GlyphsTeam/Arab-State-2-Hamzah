import React from "react";
import style from "../../../assets/style/homePage/city.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function CategoryCard(props) {

 
  return (
    <>
      <Link to={props.url} key={props.id} target="blank">
        <div className={style.cardBody}>
          <LazyLoadImage
            className={style.listImg}
            src={`${props.image}`}
            alt={`${props.name}`}
          />
          <h3 className={style.cardListTitle}>{props.name}</h3>
        </div>
      </Link>
    </>
  );
}

export default CategoryCard;
