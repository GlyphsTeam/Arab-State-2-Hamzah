import Banner from "../components/common/banner/Banner";
import SubCategoryBody from '../components/subCategory/SubCategoryBody';
import DealsCard from '../components/subCategory/DealsCard';
import style from "../assets/style/SubCategory.module.css";

function SubCategory(){ 
return(
    <>
     <Banner bannerUrl="sliders?page=stores" />
     <div className={`${style.subCategoryMainDiv} pt-3` }>
       <SubCategoryBody advUrl="ads?page=stores"/>
     </div>
     <DealsCard/>
     </> 
)
}
export default SubCategory;