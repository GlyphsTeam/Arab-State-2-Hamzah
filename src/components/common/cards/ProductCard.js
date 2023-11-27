import React, {useState} from 'react';
import style from '../../../assets/style/common/productCard.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
function ProductCard({data , isMyPost, baseUrl}) {
  const [t, i18n] = useTranslation();
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const token = localStorage.getItem("arab_user_token");
  const [count, setCount] = useState(4);
 let urlId;
  const deleteProduct = (id) => {
    try {
      fetch(`${baseUrl}/user/market/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        method: "DELETE",
      }).then(() => {
        deleteDiv(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShowAlertDelete(true);
      setCount(4);
    }
  };

  const deleteDiv = (id) => {
    const element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
  };

  return (
    <>
    <div id={data.id}>
    <Link to={`/Show-Product/${data.slug}`} state={(urlId = { id: data?.id })} className= {style.wrapper} >
    <div className={style.productImg}>
      <LazyLoadImage className={i18n.language === 'en'? style.enImgBorder : style.arImgBorder} src={data.image}  alt='Show-product'/>
    </div>
    <div className={style.productInfo}>
      <div className={style.productText}>
        <h1>{data.title}</h1>
        <h2>{data.main_category_name} {" > "} {data.category_name}</h2>
        <p>{data.description}</p>
      </div>
      <div className={`${i18n.language === 'en'? style.enProductPriceBtn : style.arProductPriceBtn} ${style.productPriceBtn}`}>
        <p className={style.productPrice}><span>{data.price}</span>$</p>
        <p className={style.productDate}>{data.created_at}</p>
      </div>
    </div>
      </Link>

         {isMyPost && (
        <div className={`row ${i18n.language === 'en' ? style.deleteProductEn : style.deleteProductAr}`}>
          <div className={style.approvalDiv}>
            {data.status ? (
              <p className={style.waitingApproval}>{t('Waiting for approval')}</p>
            ) : (
              <p className={style.published}>{t('Published')}</p>
            )}
            <p>
              {" "}
              <i
                onClick={() => deleteProduct(data.id)}
                className={`fas fa-trash-alt ${style.deleteIcon}`}
              ></i>
            </p>
          </div>
        </div>
      )}
      </div>

      </>
  )
}

export default ProductCard