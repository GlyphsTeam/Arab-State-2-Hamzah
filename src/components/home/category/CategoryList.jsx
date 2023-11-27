// import React, { useState, useEffect } from "react";
// import style from "../../../assets/style/homePage/categoryList.module.css";
// import AllCategoryList from "./AllCategoryList";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// function CategoryList({ data }) {
//   const [t, i18n] = useTranslation();
//   const [isWeb, setIsWeb] = useState(false);

//   useEffect(() => {
//     if (window.innerWidth > 992) {
//       setIsWeb(true);
//     }
//   }, [window.innerWidth]);

//   return (
//     <>
//       <div className={style.mainCategoryDiv}>
//         <div className={`container ${style.container}`}>
//           {isWeb ? (
//             <div className="row">
//               <div className={`col-lg-12 mt-5`}>
//                 <p className={style.subCategorySmallTitle}>
//                   {data?.title?.shops}
//                 </p>
//                 <h2 className={style.stateTitle}>{data?.title}</h2>
//                 <AllCategoryList
//                   data={data?.shops}
//                   type="shops"
//                   dir={true}
//                   // sliderToShow={4}
//                 />

//                 {/* <p className={style.subCategorySmallTitle}>{data?.title?.services}</p>

//               <AllCategoryList
//                 data={data?.services}
//                 type="service"
//                 dir={false}
//                 sliderToShow={4}
//               /> */}
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* <Link
//             to="/Category/all"
//             className={style.AllCategoryLink}
//           >
//             <p className={style.categorySmallTitle}>{t("catSmallTitle")}</p>
//           <h1 className={style.categoryTitle}>{t("Categories")}</h1>
//           </Link> */}
//               {data && (
//                 <>
//                   <p className={style.subCategorySmallTitle}>{t("Shops")}</p>
//                   <h2 className={style.stateTitle}>State of USA</h2>

//                   <AllCategoryList
//                     data={data?.shops}
//                     type="shops"
//                     dir={true}
//                     sliderToShow={4}
//                   />
//                   <br />
//                   <br />
//                   {/* <p className={style.subCategorySmallTitle}>{t("Services")}</p> */}

//                   {/* <AllCategoryList
//                 data={data?.services}
//                 type="services"
//                 dir={false}
//                 sliderToShow={4}
//               /> */}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
// export default CategoryList;
