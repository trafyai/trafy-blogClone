"use client";
import "@styles/common/header/NavBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import whiteLogo from "@public/assets/Images/common/header/blackLogo.png";
import trafyIcon from '@public/assets/Images/common/header/trafy icon.png';
import close1 from '@public/assets/Images/common/header/close.svg';
import blackHamburger from "@public/assets/Images/common/header/hamburger.svg";
import Default from "@public/assets/Images/common/header/default.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionOpen,setSessionOpen] = useState(null);
  const [hover, setHover] = useState(false);
  const [dataOpen,setDataOpen] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null); // New ref for dropdown
  const router = useRouter(); 

  useEffect(() => {
    const fetchSessionCookie = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getSessionCookie', {
                method: 'GET',
                credentials: 'include', // Important to send cookies
            });

            if (response.ok) {
                const data = await response.json();
                if(data.success == true){
                  setDataOpen(data);

                }

              
            }
        } catch (error) {
            // Optionally log other types of errors
            console.error('Error fetching session cookie:', error);
        }
    };

    fetchSessionCookie();
}, []);




  


  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
    };
  
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        document.body.classList.remove("overflow");
      }
      // Close the dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHover(false);
      }
    };

    if (menuOpen || hover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, hover]);

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
    } else if (targetPath.startsWith("http")) {
      window.location.href = targetPath;
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
            <Image src={trafyIcon} className="trafy-icon" />
            <Image src={whiteLogo} alt="trafy logo" className="trafy-logo" />
          </Link>
        </div>

        <div className="menu-lg">
          <div className="menu-left">
            <Link
              href="https://trafyai.com/courses/"
              className="menu-pathway"
              onClick={() => handleNavigation("https://trafyai.com/courses/")}
            >
              Pathway
            </Link>
            <Link
              href="/"
              className="menu-pathway"
              onClick={() => handleNavigation("/")}
            >
              Masterclass
            </Link>
            <Link
              href="https://blog.trafyai.com"
              className="menu-resources"
              onClick={() => handleNavigation("https://blog.trafyai.com")}
            >
              Resources
            </Link>
          </div>
          <div className="menu-right-d">
            { !dataOpen ? (
              <Link
                href="https://trafy.ai/login"
                className="menu-signup"
                onClick={() => handleNavigation("https://trafy.ai/login")}
              >
                Get Started
              </Link>
            ) : (
              <div className="menu-profile" ref={dropdownRef}>
                <div onClick={handleDropDown}>
                <div className="user-profile-image-container"
                      >
                        <Image className="user-profile-image"
                          src={dataOpen?.profilePicURL || Default}
                          alt="Profile"
                          width={28} // Set this to match the container size
                          height={28} // Set this to match the container size
                          layout="fixed"
                         objectFit="cover"
                          quality={100}
                        />
                      </div>
                </div>

                {hover && (
                  <div className="menu-user-dropdown">
                    <Link
                      href="https://trafyai.com/account-settings"
                      onClick={() => handleNavigation("https://trafyai.com/account-settings")}
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

        <div className="menu-mobile">
          <Link
            href="https://trafyai.com/courses/"
            className="menu-pathway"
            onClick={() => handleNavigation("https://trafyai.com/courses")}
            style={{ paddingRight: "16px" }}
          >
            Pathway
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
                <Link
                  href="/"
                  className="menu-pathway"
                  onClick={() => handleNavigation("/")}
                >
                  Masterclass
                </Link>
                <Link
                  href="https://blog.trafyai.com"
                  className="menu-resources"
                  onClick={() => handleNavigation("https://blog.trafyai.com")}
                >
                  Resources
                </Link>
                {dataOpen && (
                  <hr
                    style={{
                      borderBottom: "0",
                      borderTop: "1px solid var(--box-border)",
                      borderRightWidth: "0",
                      borderLeftWidth: "0",
                    }}
                  />
                )}
                {dataOpen && (
                  <Link
                    href="https://trafyai.com//-settings"
                    className="menu-account-settings"
                    onClick={() => handleNavigation("https://trafyai.com/account-settings")}
                  >
                    Account Settings
                  </Link>
                )}
                {dataOpen  && (
                  <Link
                    href="https://trafyai.com/account-security"
                    className="menu-account-security"
                    onClick={() => handleNavigation("https://trafyai.com/account-security")}
                  >
                    Security
                  </Link>
                )}
                {dataOpen  && (
                  <p className="menu-account-logout" onClick={handleLogOut}>
                    Logout
                  </p>
                )}
              </div>
              {dataOpen  && (
                <hr
                  style={{
                    borderBottom: "0",
                    borderTop: "1px solid var(--box-border)",
                    borderRightWidth: "0",
                    borderLeftWidth: "0",
                  }}
                />
              )}
              <div className="menu-right">
                {!dataOpen  ? (
                  <Link
                    href="https://trafy.ai/login"
                    className="menu-signup"
                    onClick={() => handleNavigation("https://trafy.ai/login")}
                  >
                    Get Started
                  </Link>
                ) : (
                  <div className="menu-profile">
                    <Link href="https://trafyai.com/account/-settings"
                      onClick={() => handleNavigation("https://trafyai.com/account-settings")}
>
                      <div className=""
                        style={{
                          width: "28px",
                          height: "2px",
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
                          src={dataOpen ?.profilePicURL || Default}
                          alt="Profile"
                          width="23"
                          height="23"
                          style={{ borderRadius: "50%" , width:"100%", height:"100%"}}
                        />
                      </div>
                    </Link>

                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
