import React, { useState, useEffect } from 'react';
import style from '../../../../assets/style/common/categoryNav.module.css';
import CategoryNavDropDown from './CategoryNavDropDown';
import useAxios from '../../../../hooks/useAxiosGet';
import { useNavigate } from "react-router-dom";
import Accordion from '../Accordion';

function CategoryNav({ categoryState, setCategoryState, setOpenMobileCategory, openMobileCategory }) {
  const navigate = useNavigate()
  let url = `main-market/categories`;
  const [Data] = useAxios(url);

  const [isMobile, setIsMobile] = useState(false);

  const filterActionCategory = (mainTitle, main_Id, subTitle, sub_Id) => {

    if (subTitle) {

      if (categoryState.activeSubFilterTitle === subTitle) {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: '', subId: '' });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.removeItem('subCategoryId');
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subcategory');
      } else {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: subTitle, subId: sub_Id });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('subCategoryId', sub_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.setItem('subCategoryTitle', subTitle);
        navigate('/market-place/products');
      }

    } else {
      if (categoryState.activeFilterTitle === mainTitle) {
        setCategoryState({ ...categoryState, activeFilterTitle: '', mainId: '', activeSubFilterTitle: '', subId: '' });
        localStorage.removeItem('mainCategoryId');
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('mainCategoryTitle');
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place');
      } else {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: '', subId: '' });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subCategory');
      }
    }

  }


  const mobileFilterActionCategory = (mainTitle, main_Id, subTitle, sub_Id) => {

    if (subTitle) {

      if (categoryState.activeSubFilterTitle === subTitle) {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: '', subId: '' });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.removeItem('subCategoryId');
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subcategory');
      } else {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: subTitle, subId: sub_Id });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('subCategoryId', sub_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.setItem('subCategoryTitle', subTitle);
        navigate('/market-place/products');
      }

    } else {
      if (categoryState.activeFilterTitle === mainTitle) {
        setCategoryState({ ...categoryState, activeFilterTitle: '', mainId: '', activeSubFilterTitle: '', subId: '' });
        localStorage.removeItem('mainCategoryId');
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('mainCategoryTitle');
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place');
      } else {
        setCategoryState({ ...categoryState, activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle: '', subId: '' });
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subCategory');
      }
    }

  }

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {isMobile ?
        openMobileCategory && (

          <div className={style.mobileCategoryNav}>

            <div className={style.mobileHeadCategory}>
              <h1>Categories</h1>
              <i onClick={() => setOpenMobileCategory(false)} className={`fas fa-times ${style.closeMobileCategory}`}></i>
            </div>

            <ul className={style.mobileCategoryUl}>

              {Data?.data?.main?.map((item, index) => (
                <div key={index} className={style.accordionDiv}>

                  <Accordion index={index} title={item.name} id={item.id} subData={item.categories} filerAction={filterActionCategory} mobileFilerAction={mobileFilterActionCategory} categoryState={categoryState} setCategoryState={setCategoryState} />

                </div>
              ))
              }
            </ul>



          </div>

        )
        :

        <div className={style.categoryNav}>


          <ul className={style.categoryUl}>

            {Data?.data?.main?.map((item, index) => (
              <div key={index}>


                <CategoryNavDropDown index={index} title={item.name} id={item.id} subData={item.categories} filerAction={filterActionCategory} mobileFilerAction={mobileFilterActionCategory} categoryState={categoryState} setCategoryState={setCategoryState} />


              </div>
            ))
            }
          </ul>



        </div>
      }
    </>

  )
}

export default CategoryNav