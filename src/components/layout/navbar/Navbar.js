import React, { useState, useEffect } from "react";
import style from "../../../assets/style/layout/navbar.module.scss";
import { Link } from "react-router-dom";
import MenuDropDown from "./MenuDropDown";
import Button from "../../common/Button";
import NavSearch from "../navbar/NavSearch";
import { useLocation } from "react-router-dom";
import btnStyle from "../../../assets/style/common/button.module.scss";
import {  useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../../hooks/useAxiosGet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Advertusments from "../../Advertusment/Advertusments";
function NavBar({ logoImage }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [statesDropDown, setStatesDropDown] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const pathName = location.pathname.toLocaleLowerCase();
  const navigate = useNavigate();

  const [general] = useAxios("general-setting");
  const statesData = general?.data?.navbar?.states;

  const initialState = {
    username: localStorage.getItem("arab_user_name")
      ? localStorage.getItem("arab_user_name")
      : "Guest",
    newField: null,
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleCloseModal = () => {
    setShowNavbar(false);
  };

  const changeBackground = () => {
    if (window.scrollY >= 1) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const ltrDir = () => {
    document.getElementById("root").style.direction = "ltr";
  };
  const rtlDir = () => {
    document.getElementById("root").style.direction = "rtl";
  };

  window.addEventListener("scroll", changeBackground);
  const hideNavbar =
    location.pathname.toLocaleLowerCase() === "/privacy-policy" ||
    location.pathname.toLocaleLowerCase() === "/terms-conditions";

  useEffect(() => {
    setDropDown(false);
  }, [pathName]);




  const urlChangeLang = (lang, type) => {
    const { pathname } = location;
    const params = window.location.pathname.split("/");
    const langUrl = params[1];
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    langDir(lang);
    const newPath = pathname.replace(`/${langUrl}`, "");
    window.location.replace(`/${i18n.language}${newPath}`);
  };

  const langDir = (newLang) => {
    if (newLang === "ar") {
      document.getElementById("root").style.direction = "rtl";
    } else {
      document.getElementById("root").style.direction = "ltr";
    }
  };

  const disableScroll = (bool) => {
    if (bool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  var nav = "one";
  if(
    pathName === "/profile" ||
    pathName === "/changepassword"||
    pathName === "/delete-account" || 
    pathName.includes("/show-user-guide")
  )
  {
    nav = "two"
  }

  return (
    <>
    <Advertusments/>
      {!hideNavbar && (
        <header
       className={`${nav === "one" ? style.headerContainer : style.headerContainer2
            } ${navbar ? style.activeNav : ""} `}
        >
          <div className={i18n.language === "ar" ? style.logoDivAr : ""}>
            <Link to={`/`}>
              <LazyLoadImage
                className={style.LogoImage}
                alt="Logo"
                src={
                  logoImage
                }
              />
            </Link>
          </div>
          <nav className={style.navigationBarContainer}>
            <ul className={style.navigationBarUnorderedList}>
              <Link to={`/`}>
                <li className={pathName === "/" ? style.activePath : ""}>
                  {t("Home")}{" "}
                </li>
              </Link>
              <Link to={`/about`}>
                <li className={pathName === "/about" ? style.activePath : ""}>
                  {t("about us")}
                </li>
              </Link>
              <Link to="/city">
                <li className={pathName === "/city" ? style.activePath : ""}>
                  {t("Cities")}
                </li>
              </Link>
              <Link to="/Contact">
                <li className={pathName === "/contact" ? style.activePath : ""}>
                  {t("contact us")}
                </li>
              </Link>
              <Link to="/Blog">
                <li className={pathName === "/blog" ? style.activePath : ""}>
                  {t("BlogNav")}
                </li>
              </Link>
            </ul>
          </nav>
          <div className={style.rightSubContainer}>
            <div className={style.navBarSearchMainDiv}>
              <NavSearch />
            </div>

            <div>
              <button
                className={style.statesBtn}
                onClick={() => {
                  setStatesDropDown(!statesDropDown);
                }}
              >
                <i className={`fas fa-th ${style.stateIcon}`}></i>
              </button>

              {statesDropDown && (
                <div className={`row ${style.statesDropDownDiv}`}>
                  {statesData?.map((item, index) => (
                    <a
                      key={index}
                      className={`col-4 ${style.statesImg}`}
                      href={`${item.url}`}
                      target="blank"
                    >
                      {" "}
                      <div className={`${style.imageContainerSpan}`}>
                        <LazyLoadImage src={item.image} height={50} width={50} alt="img-countery" />{" "}
                        <span style={{ fontSize: "11px", fontWeight: "bold", marginTop: '10px' }} >{item.title}</span >
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div>
              {i18n.language === "en" && (
                <button
                  className={style.languageBtn}
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    rtlDir();
                    setShowNavbar(false);
                    urlChangeLang("ar");
                  }}
                >
                  <i className={`fas fa-globe ${style.languageIcon}`}></i> AR
                </button>
              )}
              {i18n.language === "ar" && (
                <button
                  className={style.languageBtn}
                  onClick={() => {
                    i18n.changeLanguage("en");
                    ltrDir();
                    setShowNavbar(false);
                    urlChangeLang("en");
                  }}
                >
                  <i className={`fas fa-globe ${style.languageIcon}`}></i> EN
                </button>
              )}
            </div>

            <div>
              {initialState && initialState.username === "Guest" ? (
                <Link to="/login">
                  <Button
                    handleCloseModal={handleCloseModal}
                    btnInfo={
                      <div className={btnStyle.iconUserDiv}>
                        <i className={`far fa-user  ${style.userIcon}`}></i>
                      </div>
                    }
                  />
                </Link>
              ) : (
                <MenuDropDown
                  dropDownInfo={
                    <div className={btnStyle.userloggedinBtn}>
                      <i className={`far fa-user  ${style.userIcon}`}></i>
                      {initialState.username.split(" ")[0]}
                    </div>
                  }
                  handleCloseModal={handleCloseModal}
                  menuElements={[
                    {
                      path: "/Profile",

                      title: (
                        <div >
                          <i className={`fas fa-user-circle ${style.navCutome}`}>{t("Profile")}</i>{" "}
                        </div>
                      ),
                    },
                    {
                      path: "/",
                      title: (
                        <div onClick={logout} >
                          <i className={`fas fa-sign-out-alt ${style.navCutome}`}> {t("LogOut")} </i>{" "}
                        </div>
                      ),
                    },
                  ]}
                />
              )}
            </div>
          </div>
          <div
            className={
              i18n.language === "en"
                ? style.searchMenuDivMobile
                : style.searchMenuDivMobileAr
            }
          >
            <div
              className={`${style.navBarSearchMainDiv} ${style.navMobileMargin}`}
            >
              <NavSearch />
            </div>

            <div>
              <button
                className={style.statesBtn}
                onClick={() => {
                  setStatesDropDown(!statesDropDown);
                  disableScroll(!statesDropDown);
                }}
              >
                <i className={`fas fa-th ${style.stateIcon}`}></i>
              </button>
            </div>

            <div className={`${style.burgerMenu}`} onClick={handleShowNavbar}>
              <i className={`fas fa-bars`}></i>
            </div>
          </div>
          {showNavbar && (
            <div className={style.showNavBarMainContainerMobile}>
              <div
                className={`${showNavbar ? style.showNavigationBarMobile : ""}`}
              >
                <div className={style.showNavBarMainMobile}>
                  <nav className={style.navigationBarContainerMobile}>
                    <ul className={style.navigationBarUnorderedList}>
                      <Link to="/" onClick={handleCloseModal}>
                        <li> {t("Home")} </li>
                      </Link>
                      <Link to="/About" onClick={handleCloseModal}>
                        <li> {t("about us")}</li>
                      </Link>
                      <li>
                        <Link to="/city">
                          <li
                            className={
                              pathName === "/city" ? style.activePath : ""
                            }
                            onClick={handleCloseModal}
                          >
                            {t("Cities")}
                          </li>
                        </Link>
                      </li>

                      <Link to="/Contact" onClick={handleCloseModal}>
                        <li> {t("Contact")} </li>
                      </Link>
                      <Link to="/Blog" onClick={handleCloseModal}>
                        <li> {t("Blog")} </li>
                      </Link>
                    </ul>
                  </nav>
                  <div className={style.rightSubContainerMobile}>
                    <div>
                      {initialState && initialState.username === "Guest" ? (
                        <Link to="/login">
                          <Button
                            handleCloseModal={handleCloseModal}
                            btnInfo={
                              <div className={btnStyle.iconUserDiv}>
                                <i
                                  className={`far fa-user  ${style.userIcon}`}
                                ></i>
                              </div>
                            }
                          />
                        </Link>
                      ) : (
                        <MenuDropDown
                          handleCloseModal={handleCloseModal}
                          dropDownInfo={
                            <div className={btnStyle.userloggedinBtn}>
                              <i
                                className={`far fa-user  ${style.userIcon}`}
                              ></i>
                              {initialState.username.split(" ")[0]}
                            </div>
                          }
                          menuElements={[
                            {
                              path: "/Profile",
                              title: (
                                <div>
                                  <i className={`fas fa-user-circle ${style.navCutome}`}>
                                    {t("Profile")}
                                  </i>{" "}
                                </div>
                              ),
                            },
                            {
                              path: "/",
                              title: (
                                <div onClick={logout}>
                                  <i className={`fas fa-sign-out-alt ${style.navCutome}`}>
                                    {t("LogOut")}
                                  </i>
                                </div>
                              ),
                            },
                          ]}
                        />
                      )}
                    </div>
                    <div>
                      {i18n.language === "en" && (
                        <button
                          className={style.languageBtn}
                          onClick={() => {
                            i18n.changeLanguage("ar");
                            rtlDir();
                            setShowNavbar(false);
                            urlChangeLang("ar");
                          }}
                        >
                          <i
                            className={`fas fa-globe ${style.languageIcon}`}
                          ></i>{" "}
                          AR
                        </button>
                      )}
                      {i18n.language === "ar" && (
                        <button
                          className={style.languageBtn}
                          onClick={() => {
                            i18n.changeLanguage("en");
                            ltrDir();
                            setShowNavbar(false);
                            urlChangeLang("en");
                          }}
                        >
                          <i
                            className={`fas fa-globe ${style.languageIcon}`}
                          ></i>{" "}
                          EN
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
      )}

      {statesDropDown && (
        <div className={style.mainStateDiv}>
          <div className={`row ${style.statesDropDownDivMobile}`}>
            <div className={style.mobilestateHeight}>
              {statesData?.map((item, index) => (
                <a
                  key={index}
                  className={`col-4 ${style.statesImg}`}
                  href={`${item.url}`}
                  target="blank"
                >
                  {" "}
                  <div className={`${style.imageContainerSpan}`}>
                  <LazyLoadImage
                    className={`mt-3`}
                    src={item.image}
                    height={50}
                    width={50}
                    alt="img-countery"
                  />{" "}
                  <span style={{ fontSize: "11px", fontWeight: "bold", marginTop: '10px' }} >{item.title}</span >
                   </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
