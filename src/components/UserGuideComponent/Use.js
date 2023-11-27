import style from "../../assets/style/UserGuide.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { React, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Use({ userGuide , urlId}) {
  const [t, i18n] = useTranslation();
;
  const use = userGuide?.model;
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = use?.slice(firstPostIndex, lastPostIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const statisticsId = useRef(null);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveIndex(currentPage - 2);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(use?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      setActiveIndex(currentPage);
    }
  };
  const scrollPagination = () => {
    if (window.innerWidth < 480) {
      statisticsId.current.scrollIntoView();
      }
  };
  return (
    <>
      <h2 className={style.popularHeader}>{userGuide?.title}</h2>
      <div className={`${style.columnCardsContainer} pt-4`}>
        {currentPosts?.map((item) => (
          <Link
            key={item.id}
            to={`/Show-User-Guide/${item?.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
            onClick={handleChangePage}
          >
            <div className={style.columnCardsContainerDiv}>
              <div className={i18n.language === 'en'? style.colCardImg : style.colCardImgArabic}>
                <LazyLoadImage src={item.image} alt="userGuideImage"/>
              </div>
              <div className={style.cloumnParagraph}>
                <h3>{item.title} </h3>
                <p>{item.description}</p>
                <div className={style.columnCardReadMore}>
                  <Link
                    key={item.id}
                    to={`/Show-User-Guide/${item?.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
                    onClick={handleChangePage}
                  >
                    <small className={style.readMoreText}>
                      {t("Read More")}
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
             <Pagination
          totalPosts={use?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          scrollPagination={scrollPagination}
        />{" "}
      </div>
    </>
  );
}
export default Use;