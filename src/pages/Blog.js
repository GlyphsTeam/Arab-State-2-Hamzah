
import style from "../assets/style/Blog.module.css";
import useAxios from "../hooks/useAxiosGet";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { lazy, Suspense } from "react";

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
  const [Data] = useAxios(url);
  const blogData = Data?.data;
  const urlpath = useLocation();
  const pathName = urlpath.pathname;
  let urlId;
  const titlePage = "Blog Page"

  return (
    <>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={blogData?.main?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <div className={style.blogPageStyle}>
          <BlogHeader data={blogData?.slider} />
          <div className={`${style.firstConBackground}`}>
            <div className={`container`}>
              <div className={`row ${style.rowBlog}`}>
                <div
                  className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
                >
                  <BlogLetter Data={Data} />
                </div>
                <div className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}>
                  <BlogSearch Data={Data} />
                  <div>
                    <EventCards data={blogData?.events} pathName={pathName} urlId={urlId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.secondConBackground}`}>
            <div className={`container`}>
              <div className={`row `}>
                <div>
                  <BlogCards data={blogData?.statistics} />

                </div>
              </div>
            </div>
          </div>
          <div className={`${style.lastConBackground}`}>
            <div className={`container`}>
              <div className={style.columnCardsMainDiv}>
                <PopularCards data={blogData?.around} urlId={urlId} />
              </div>
            </div>
            <div className={`container`}>
              <div className={`pt-5`}>
                <PlacesToVisit data={blogData?.visit} urlId={urlId} />
                <Tags data={blogData?.tags} pathName={pathName} />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
export default BlogPage;

