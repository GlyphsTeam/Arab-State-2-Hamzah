import style from "../../../assets/style/homePage/categoryList.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
function CategoryCard(props) {

  return (
    <>
      <div key={props.id}>
        <div className={style.cardBody}>
          <LazyLoadImage
            className={style.listImg}
            src={`${props.image}`}
            alt={`list ${props.title}`}
          />
          <h3 className={style.cardListTitle}>{props.title}</h3>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
