import React, { useEffect, useState, lazy, s, Suspense } from "react";
import { Crisp } from "crisp-sdk-web";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import { useTranslation } from "react-i18next";
import OneSignal from "react-onesignal";
import GetLang from "./Utils/language/GetLang"
import ScrollToTop from "./components/common/ScrollToTop";
import MetaPixel from "./Utils/MetaPixel";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import useAxios from "./hooks/useAxiosGet";

import { stateCategory } from './redux/slices/login';
import { useSelector } from 'react-redux'
const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/layout/footer/Footer"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));
const Blog = lazy(() => import("./pages/Blog"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/ContactUs"));
const Page404 = lazy(() => import("./pages/Page404"));
const PrivacyPolicy = lazy(() => import("./components/legal/PrivacyPolicy"));
const Terms_conditions = lazy(() => import("./components/legal/Terms_conditions"));
const ShowBlog = lazy(() => import("./pages/ShowBlog"));
const About = lazy(() => import("./pages/AboutPage"));
const ChangePassword = lazy(() => import("./components/userProfile/ChangePassword"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const EulaGeorgiaPage = lazy(() => import("./pages/EulaGeorgiaPage"));
const UserGuide = lazy(() => import("./pages/UserGuidePage"));
const ShowUserGuide = lazy(() => import("./pages/ShowUserGuide"));
const SearchResultPage = lazy(() => import("./pages/SearchResultPage"));
const JotForm = lazy(() => import("./pages/JotFormPage"));
const PrivateRoutes = lazy(() => import(("./Utils/PrivateRoutes")))
const City = lazy(() => import("./pages/Cities"));
const SpinnerStatic = lazy(() => import('./components/common/Spinner'));

function App() {
  let generalUrl = "general-setting";
  let authUrl = "login-page";
  const stateMus = useSelector(stateCategory);
  const [Data] = useAxios(generalUrl);
  const [authData] = useAxios(authUrl);

  const logoImage = Data?.data?.navbar?.logo;
  const authImage = authData?.data?.login_page?.image;
  const logoWeb = Data?.data?.logo
  console.log(" Data?.data>>>", Data?.data?.logo)
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_KEY,
    });
  }, []);
  const cityName = process.env.REACT_APP_City;
  if (cityName === "TX") {
    import('./assets/style/App.module.css').then(() => {
    }).catch(err => console.log(err))
  }
  if (cityName === "FL") {
    import('./assets/style/statesPalettes/arabFlorida/App.module.css').then(() => {
    }).catch(err => console.log(err))
  }
  if (cityName === "CA") {
    import('./assets/style/statesPalettes/arabCalifornia/App.module.css').then(() => {
    }).catch(err => console.log(err));
  }

  const [t] = useTranslation();

  const autherized = localStorage.getItem("arab_user_token");

  const cityId = localStorage.getItem("cityId");
  let cityIdUrl = "/0";
  useEffect(() => {
    if (cityId) {
      cityIdUrl = `/${cityId}`;
    } else {
      cityIdUrl = "/0";
    }
  }, [cityId]);

  const authAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City
    }/${t("en")}${cityIdUrl}`;
  const guestAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City
    }/${t("en")}${cityIdUrl}`;

  useEffect(() => {
    autherized ? setBaseURL(authAPI) : setBaseURL(guestAPI);
  }, [autherized]);

  const login_api = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en${cityIdUrl}/login`;
  const regester_api = `${baseURL}/register`;
  const profile_api = `${baseURL}/profile`;
  const blogs_api = `${baseURL}/blogs`;
  const fav_api = `${baseURL}/profile/favorite`;
  const saved_api = `${baseURL}/profile/save`;

  useEffect(() => {
    Crisp.configure(process.env.REACT_APP_CRISP_KEY);
  }, []);

  const token = localStorage.getItem("arab_user_token");
  const userName = localStorage.getItem("arab_user_name");
  const userEmail = localStorage.getItem("arab_user_email");

  useEffect(() => {
    if (token) {
      Crisp.setTokenId(token);
      Crisp.user.setEmail(userEmail);
      Crisp.user.setNickname(userName);
    } else {
      Crisp.user.setNickname("Guest");
    }
  }, []);

  const [lang] = GetLang();


  return (
    <>
      <Router basename={`/${lang}`}>
      {stateMus?.isLoading ? (
          <>
            <SpinnerStatic />
          </>
        ) : <></>}


        <MetaPixel />
        <ScrollToTop />
        <ScrollToTopButton />
        <Navbar
          url={login_api}
          regesterUrl={regester_api}
          logoImage={logoImage}
        />
        <Suspense fallback={<SpinnerStatic />}>

          <main className="mainSection">
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route
                  path={`/Profile`}
                  element={
                    <UserProfilePage
                      url={profile_api}
                      fav={fav_api}
                      saved={saved_api}
                    />
                  }
                />
                <Route
                  path={`/delete-account`}
                  element={
                    <DeleteAccountPage baseUrl={authAPI} logo={logoWeb} />
                  }
                />
                <Route
                  path={`/changePassword`}
                  element={<ChangePassword baseUrl={authAPI} logo={logoWeb} />}
                />
              </Route>

              <Route path={``} element={<Home baseURL={baseURL} />} />
              <Route exact path={`/Blog`} element={<Blog url={blogs_api} />} />
              <Route
                exact
                path={`/Contact`}
                element={<Contact baseURL={guestAPI} />}
              />
              <Route
                exact
                path={`/Login`}
                element={<Login baseURL={guestAPI} logo={logoWeb} />}
              />
              <Route
                exact
                path={`/Register`}
                element={<Register baseURL={baseURL} logo={logoWeb} />}
              />
              <Route
                exact
                path={`/search-result/:keyword/:type?`}
                element={<SearchResultPage />}
              />
              <Route exact path={`/Privacy-Policy`} element={<PrivacyPolicy />} />
              <Route
                exact
                path={`/Terms-conditions`}
                element={<Terms_conditions />}
              />
              <Route
                exact
                path={`/Show-Blog/:id?/:slug?`}
                element={<ShowBlog />}
              />
              <Route exact path={`/About`} element={<About />} />
              <Route
                exact
                path={`/Forget-Password`}
                element={<ForgetPassword baseURL={baseURL} logo={logoWeb} />}
              />
              <Route exact path={`/eula`} element={<EulaGeorgiaPage />} />
              <Route
                exact
                path={`/User-Guide`}
                element={<UserGuide url={blogs_api} />}
              />
              <Route
                exact
                path={`/Show-User-Guide/:id/:slug?`}
                element={<ShowUserGuide />}
              />
              <Route exact path={`/city`} element={<City />} />
              <Route exact path={`/form/:slug`} element={<JotForm />} />
              <Route exact path="/*" element={<Page404 />} />
            </Routes>
          </main>
        </Suspense>

        <Footer logoImage={logoImage} />
      </Router>
    </>
  );
}

export default App;
