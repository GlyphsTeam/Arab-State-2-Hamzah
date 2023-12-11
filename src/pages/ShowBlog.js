import React, { useState, useEffect } from "react";
import style from "../assets/style/show_blog.module.css";
import LeftShowBlog from "../components/showBlog/LeftShowBlog";
import useAxios from "../hooks/useAxiosGet";
import Similar from "../components/blog/Similar";
import ShowBlogParagraph from "../components/showBlog/ShowBlogParagraph";
import BlogSearch from "../components/blog/BlogSearch";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from 'html-react-parser';
import { useLocation } from 'react-router-dom';
import Banner from "../components/common/banner/Banner";
import BlogHeader from "../components/blog/BlogHeader";
import EventCards from "../components/blog/EventCards";
import Share from '../Utils/Share'
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from 'react-helmet'
function ShowBlog() {
  const [t, i18n] = useTranslation();
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1]
  let showBlogUrl = `blogs/web/show/${id}`;
  const urlpath = useLocation();
  const [isSaved, setSaved] = useState(true);

  const pathName = `/${i18n.language}` + urlpath.pathname;
  let urlId;
  const [showShareModal, setShowShareModal] = useState(false);

  const [Data] = useAxios(showBlogUrl);

  let showBlogData = Data?.data?.blog;
  let sliderData = Data?.data;
  console.log("showBlogData>>>", showBlogData);
  console.log("htt", `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/favorite/blog`)
  const saveBlogHandler = async (id) => {
    const token = localStorage.getItem('arab_user_token')
    let formData = new FormData();
    formData.append('id', id);
    let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/favorite/blog`
    await axios.post(backend_url, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (isSaved) {
        setSaved(false)
      }
      else {
        setSaved(true);
      }

    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    if (showBlogData?.saved) {
      setSaved(true)
    }
    else {
      setSaved(false)
    }
  }, [showBlogData?.saved])
  let favoriteIcon = isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';

  return (
    <div className={style.showBlogContainer}>
      <Helmet>
        <title>{showBlogData?.title}</title>
        <meta name="description" content={ReactHtmlParser(`${showBlogData?.web_description}`)}/>
      </Helmet>
      <BlogHeader data={sliderData?.slider} />

      <Banner />
      <div className={`container`}>
        <div className={`row`}>
          <div className="col-lg-8 col-md-12 col-sm-12 pt-5">
            <div>
              <h4 className={style.showBlogTitle}>{showBlogData?.title}</h4>
              <p className={style.showBlogDate}>{showBlogData?.created_at} </p>
            </div>
            <div>
              <div className={style.iconsShareAndSave}>
                <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={() => saveBlogHandler(id)}></i>
                <p className={`px-3 ${style.favoriteIconCursor}`} onClick={() => setShowShareModal(true)}>
                  <i
                    className={`fas fa-share-square ${style.shareIconMargin}`}
                  ></i>
                  {t("Share Shop")}
                </p>
                <a href={showBlogData?.link_youtube} target="_blank"><i className={`fab fa-youtube ${style.youtubIcon}`}></i></a>
              </div>
              {showShareModal && <Share url={pathName} setShowShareModal={setShowShareModal} />}

              <LazyLoadImage src={showBlogData?.image} className={style.showBlogImage} alt="showBlog" />
              <p className={` ${style.showBlogParagraph} pt-3`}>
                {showBlogData?.web_description && ReactHtmlParser(`${showBlogData?.web_description}`)}
              </p>
            </div>
            <ShowBlogParagraph Data={Data} showBlogData={showBlogData} />
            <LeftShowBlog Data={Data} showBlogData={showBlogData} />
          </div>
          <div
            className={`col-lg-4 col-md-12 col-sm-12 ${style.eventCardContainer}`}
          >


            <BlogSearch Data={Data} />

            <EventCards data={sliderData?.events} pathName={pathName} urlId={urlId} />
          </div>
        </div>
      </div>
      <div>
        <Similar showBlogData={showBlogData} id={id} />
      </div>
    </div>
  );
}
export default ShowBlog;
