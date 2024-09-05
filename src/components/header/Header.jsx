
"use client";
import "@/styles/header/NavBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import whiteLogo from "@/public/Images/header/blackLogo.png";
import trafyIcon from "@/public/Images/header/trafy icon.png";

import close1 from "@/public/Images/header/close.svg";
import blackHamburger from "@/public/Images/header/hamburger.svg";
import { UserAuth } from "@/context/AuthContext";
import Default from "@/public/Images/header/default.svg"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const { user, logOut, loading } = UserAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        document.body.classList.remove("overflow");
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
    setHover(false);
    document.body.classList.toggle("overflow");
  }

  function handleNavigation(targetPath) {
    if (targetPath.startsWith("#")) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      const element = document.querySelector(targetPath);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (router.pathname !== targetPath) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      router.push(targetPath);
    }
  }

  const handleDropDown = () => {
    setHover(!hover);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setHover(false);
      router.push("/");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-log">


          <Link href="/">
            {" "}
            <Image src={trafyIcon} className="trafy-icon"/>
            <Image src={whiteLogo} alt="trafy logo" className="trafy-logo" />
          </Link>
        </div>

        
        
        <div className="menu-lg">
        <div className="menu-left">
            <Link
              href="https://trafyai.com/courses"
              className="menu-pathway"
              onClick={() => handleNavigation("https://trafyai.com/courses")}
            >
             Courses
            </Link>
            <Link
              href="/"
              className="menu-pathway"
              onClick={() => handleNavigation("/")}
            >
             Masterclass
            </Link>
            <Link
              href="/"
              className="menu-resources"
              onClick={() => handleNavigation("/")}
            >
              {" "}
              Resources{" "}
            </Link>
          
            {/* <Link href="/" className="menu-innovation" onClick={() => handleNavigation('/')}> Innovation Circle </Link> */}
          </div>
          <div className="menu-right-d">
            {!loading && !user ? (
                <Link
                  href="/signup"
                  className="menu-signup"
                  onClick={() => handleNavigation("/signup")}
                >
                  {" "}
                  Get Started
                </Link>
             
            ) : (
              <div className="menu-profile">
                <div onClick={handleDropDown}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "100%",
                      backgroundColor: "#f8f8f8",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontFamily: "Inter",
                    }}
                  >
                    <Image
                      src={user?.profilePicURL || Default}
                      alt="Profile"
                      width={24}
                      height={24}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                </div>

                {hover && (
                  <div className="menu-user-dropdown">
                    <Link
                      href="https://trafyai.com/account-settings"
                      // onClick={() => handleNavigation("https://trafyai.com/account-settings")}
                    >
                      <p>Profile</p>
                    </Link>
                    <Link
                      href="https://trafyai.com/account-security"
                      onClick={() => handleNavigation("https://trafyai.com/account-security")}
                    >
                      <p>Security</p>
                    </Link>
                    <p onClick={handleLogOut}>Logout</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

       

                  {/* 0------------------------------------Hamburger----------------------------------- */}
        <div className="menu-mobile">
        <Link
              href="https://trafyai.com/courses/"
              className="menu-pathway"
              onClick={() => handleNavigation("https://trafyai.com/courses")}
              style={{paddingRight:"16px"}}
            >
             Courses
            </Link>
          <Image
            src={blackHamburger}
            alt=""
            className={`hamburger ${menuOpen ? "hide" : ""}`}
            onClick={toggleMenu}
          /> 
           <Image
            src={close1}
            alt=""
            className={`exit-icon ${menuOpen ? "show" : ""}`}
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="menu-mobile-contents" ref={menuRef}>
              <div className="menu-top-contents">
           
{/*                 
            <Link
              href="/courses"
              className="menu-pathway"
              onClick={() => handleNavigation("/courses")}
            >
             Courses
            </Link> */}
            <Link
              href="/"
              className="menu-pathway"
              onClick={() => handleNavigation("/")}
            >
             Masterclass
            </Link>
                <Link
                  href="/"
                  className="menu-resources"
                  onClick={() => handleNavigation("/")}
                >
                  {" "}
                  Resources{" "}
                </Link>
               
                {/* <Link href="/" className="menu-innovation" onClick={() => handleNavigation('/')}> Innovation Circle </Link> */}
                {user &&  (<hr
                  style={{
                    borderBottom: "0",
                    borderTop: "1px solid var(--box-border)",
                    borderRightWidth: "0",
                    borderLeftWidth: "0",
                  }}
                />
          )}
                {user && (
                  <Link
                    href="/account-settings"
                    className="menu-account-settings"
                    onClick={() => handleNavigation("/account-settings")}
                  >
                    Account Settings
                  </Link>
                )}
                {user && (
                  <Link
                    href="/account-security"
                    className="menu-account-security"
                    onClick={() => handleNavigation("/account-security")}
                  >
                    Security
                  </Link>
                )}
             
                {user && (
                  <p className="menu-account-logout" onClick={handleLogOut}>
                    Logout
                  </p>
                )}
              </div>
              {user &&  (<hr
                  style={{
                    borderBottom: "0",
                    borderTop: "1px solid var(--box-border)",
                    borderRightWidth: "0",
                    borderLeftWidth: "0",
                  }}
                />
          )}
              <div className="menu-right">
            {!loading && !user ? (
                <Link
                  href="/signup"
                  className="menu-signup"
                  onClick={() => handleNavigation("/signup")}
                >
                  {" "}
                  Get Started
                </Link>
             
            ) : (
              <div className="menu-profile">
                <div onClick={handleDropDown}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "100%",
                      backgroundColor: "#f8f8f8",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontFamily: "Inter",
                    }}
                  >
                    <Image
                      src={user?.profilePicURL || Default}
                      alt="Profile"
                      width={24}
                      height={24}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                </div>

                {hover && (
                  <div className="menu-user-dropdown">
                    <Link
                      href="/account-settings"
                      onClick={() => handleNavigation("/account-settings")}
                    >
                      <p>Profile</p>
                    </Link>
                    <Link
                      href="/account-security"
                      onClick={() => handleNavigation("/account-security")}
                    >
                      <p>Security</p>
                    </Link>
                    <p onClick={handleLogOut}>Logout</p>
                  </div>
                )}
              </div>
            )}
          </div>
              
            </div>
          )}
        </div>
        {/* ------------------------------------------------------------------------- */}

      </div>
    </div>
  );
};

export default Header;
