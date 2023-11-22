import React, { useState } from "react";
import NavbarLink from "./NavbarLink";
import { useNav } from "../hooks/useNav";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";

const Nav = () => {
  const {t,isAdmin, setLanguage, selectedLanguage, handleLogOut} = useNav()

  const [burgerMenu, showBurgerMenu] = useState<any>(false)

  const user = useAppSelector(getUser)

  const closeIcon = "https://cdn-icons-png.flaticon.com/128/61/61155.png"
  const burgerIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__inner">
          <div className="nav__left">
          <div className="nav__burger-menu-button-area">
            <button onClick={() => showBurgerMenu((prev:boolean) => !prev)} className="nav__burger-menu-button">
              {
                burgerMenu ?
                <p>{t("close")}</p> :
                <img className="nav__burger-img" src={burgerIcon} alt="" />
              }
              
            </button>
          </div>
            <NavLink className="nav__user" to="/onboarding">
              <img
                src={user.pic_url}
                className="nav__user-pic"
                alt="Profile picture"
              />
              <p className="nav__user-name">{user.first_name}</p>
            </NavLink>
            <ul className="menu">
              {/* <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/onboarding"}
                  title={t("onboarding-page")}
                />
              </li> */}
              <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/dashboard"}
                  title={t("dashboard-page")}
                />
              </li>
              <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/chat"}
                  title={t("chat-page")}
                />
              </li>
              {isAdmin ? (
                <li className="menu__item">
                  <NavbarLink
                    activeClass={"menu__link menu__link--active"}
                    normalClass={"menu__link"}
                    to={"/admin"}
                    title={t("admin-page")}
                  />
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="nav__language-area">
            <button
              onClick={() => setLanguage("en")}
              className={
                selectedLanguage === "en"
                  ? "nav__language-choice nav__language-choice--active"
                  : "nav__language-choice"
              }
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ua")}
              className={
                selectedLanguage === "ua"
                  ? "nav__language-choice nav__language-choice--active"
                  : "nav__language-choice"
              }
            >
              UA
            </button>
          </div>
          <button className="nav__button primary-button" onClick={handleLogOut}>
            {t("log-out")}
          </button>
        </div>
      </div>
      {
        burgerMenu && 
        <div className="burger-menu">
          <ul className="burger-menu-links">
              {/* <li className="menu__item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active"}
                  normalClass={"menu__link"}
                  to={"/onboarding"}
                  title={t("onboarding-page")}
                />
              </li> */}
              <li onClick={() => showBurgerMenu(false)} className="menu__item burger-item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active burger-link"}
                  normalClass={"menu__link burger-link"}
                  to={"/dashboard"}
                  title={t("dashboard-page")}
                />
              </li>
              <li onClick={() => showBurgerMenu(false)} className="menu__item burger-item">
                <NavbarLink
                  activeClass={"menu__link menu__link--active burger-link"}
                  normalClass={"menu__link burger-link"}
                  to={"/chat"}
                  title={t("chat-page")}
                />
              </li>
              {isAdmin ? (
                <li onClick={() => showBurgerMenu(false)} className="menu__item burger-item">
                  <NavbarLink
                    activeClass={"menu__link menu__link--active burger-link"}
                    normalClass={"menu__link burger-link"}
                    to={"/admin"}
                    title={t("admin-page")}
                  />
                </li>
              ) : (
                <></>
              )}
            </ul>
        </div>
      }
    </div>
  );
};

export default Nav;
