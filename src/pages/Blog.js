
import style from "../assets/style/Blog.module.css";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { setBlogData } from '../redux/Blog/blog';
import axios from 'axios';

const BlogHeader = lazy(() => import("../components/blog/BlogHeader"));
const BlogLetter = lazy(() => import("../components/blog/BlogLetter"));
const BlogCards = lazy(() => import("../components/blog/StatisticsSection"));
const PopularCards = lazy(() => import("../components/blog/PopularSection"));
const BlogSearch = lazy(() => import("../components/blog/BlogSearch"));
const EventCards = lazy(() => import("../components/blog/EventCards"));
const Tags = lazy(() => import("../components/blog/Tags"));
const PlacesToVisit = lazy(() => import("../components/blog/PlacesToVisitSection"));
const SpinnerStatic = lazy(() => import("../components/common/Spinner"));



function BlogPage() {
  const url = `blogs/web`
  const urlpath = useLocation();
  const pathName = urlpath.pathname;
  const blogState = useSelector((state) => state.blog.blogData)
  let urlId;
  const titlePage = "Blog Page"
  const dispatch = useDispatch();
  const getBlogData = async () => {
    let cityIdUrl = '/0';

    const token = localStorage.getItem("arab_user_token")
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en${cityIdUrl}`;

    if (blogState === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }

      }).then((res) => {
        dispatch(setLoading(false));
        dispatch(setBlogData(res.data?.data));

      }).catch((err) => {
        dispatch(setLoading(false))
        console.log(err);
      })
    }
  }
  useEffect(() => {
    getBlogData();
  }, []);
  console.log("blogState>>>",blogState)
  return (
    <>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={blogState?.main?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <div className={style.blogPageStyle}>
          <BlogHeader data={blogState?.slider} />
          <div className={`${style.firstConBackground}`}>
            <div className={`container`}>
              <div className={`row ${style.rowBlog}`}>
                <div
                  className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
                >
                  <BlogLetter Data={blogState} />
                </div>
                <div className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}>
                  <BlogSearch Data={blogState} />
                  <div>
                    <EventCards data={blogState?.events} pathName={pathName} urlId={urlId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.secondConBackground}`}>
            <div className={`container`}>
              <div className={`row `}>
                <div>
                  <BlogCards data={blogState?.statistics} />

                </div>
              </div>
            </div>
          </div>
          <div className={`${style.lastConBackground}`}>
            <div className={`container`}>
              <div className={style.columnCardsMainDiv}>
                <PopularCards data={blogState?.around} urlId={urlId} />
              </div>
            </div>
            <div className={`container`}>
              <div className={`pt-5`}>
                <PlacesToVisit data={blogState?.visit} urlId={urlId} />
                <Tags data={blogState?.tags} pathName={pathName} />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
export default BlogPage;

