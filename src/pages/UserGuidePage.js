
import style from "../assets/style/UserGuide.module.css";

import { useLocation } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { setUserData } from '../redux/UserGuide/user';
import axios from 'axios';
import { Helmet } from "react-helmet"
const UserGuideHeader = lazy(() => import("../components/UserGuideComponent/UserGuideHeader"));
const UserGuideLetter = lazy(() => import("../components/UserGuideComponent/UserGuideLetter"));
const CreateAccount = lazy(() => import("../components/UserGuideComponent/CreateAccount"));
const Use = lazy(() => import("../components/UserGuideComponent/Use"));
const UserGuideSearch = lazy(() => import("../components/UserGuideComponent/UserGuideSearch"));
const EventCards = lazy(() => import("../components/UserGuideComponent/EventCards"));
const Tags = lazy(() => import("../components/UserGuideComponent/Tags"));
const FAQs = lazy(() => import("../components/UserGuideComponent/FAQs"));

function UserGuidePage() {
  const url = `user_guides/web`; 
  const titlePage = "User Guide";

  const blogLocation = useLocation();
  const pathName = blogLocation.pathname;
  let urlId;
  const userState = useSelector((state) => state.userGuide.userData);
  const dispatch = useDispatch();

  const getUserData = async () => {
    let cityIdUrl = '/0';
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en${cityIdUrl}`;
    const token = localStorage.getItem("arab_user_token");

    if (userState === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        dispatch(setUserData(res.data?.data));
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  
  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
    <Helmet>
     <title>{titlePage}</title>
     <meta  name="description" content={userState?.main.description}/>
    </Helmet>
    <div className={style.blogPageStyle}>
      <UserGuideHeader data={userState?.slider} />
      <div className={`${style.firstConBackground}`}>
        <div className={`container`}>
          <div className={`row ${style.rowBlog}`}>
            <div
              className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
            >
              <UserGuideLetter userGuide={userState?.main} />
            </div>
            <div
              className={`col-lg-5 col-md-12 col-sm-12 pt-5 ${style.SearchEventContainer}`}
            >
              <UserGuideSearch userGuide={userState} />
              <div>
                <EventCards userGuide={userState?.evens} pathName={pathName} urlId={urlId} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.secondConBackground}`}>
        <div className={`container`}>
          <div className={`row `}>
            <div>
              <CreateAccount userGuide={userState?.account} urlId={urlId} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.lastConBackground}`}>
        <div className={`container`}>
          <div className={style.columnCardsMainDiv}>
            <Use userGuide={userState?.use} urlId={urlId} />
          </div>
        </div>
        <div className={`container`}>
          <div className={`pt-5`}>
            <FAQs userGuide={userState?.faq} urlId={urlId} />
            <Tags userGuide={userState?.tags} pathName={pathName} />
          </div>
        </div>
      </div>
    </div>
    </>

  );
}
export default UserGuidePage;
