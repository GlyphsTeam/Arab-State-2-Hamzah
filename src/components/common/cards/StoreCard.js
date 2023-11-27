import style from "../../../assets/style/SubCategory.module.css";
import { Link} from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function SubCategoryCard({ storeData }) {
  let urlId;

  return (
    <>
    <div className={`${style.cardDiv} col-lg-4 col-md-6 col-sm-6`} >
      <Link
        to={`/Marketprofile/${storeData.slug}`}
        state={(urlId = { id: storeData?.id })}
        className={`${style.subCategoryCardLink} `}
      >
        <LazyLoadImage className={`${style.categoryImage}`} src={storeData.image} height={215} alt="imageCatergory"/>
        <p className={`${style.cardTitle} `}>{storeData.name}</p>
      </Link>
      </div>
    </>
  );
}
export default SubCategoryCard;
