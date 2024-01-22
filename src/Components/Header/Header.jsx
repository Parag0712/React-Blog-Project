import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, startLoading, stopLoading } from "../../App/authSlice";
import authServices from "../../appwrite/auth";
import { Button } from "../index";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Header() {
  // Get User Status Redux
  const userStatus = useSelector((state) => {
    return state.auth;
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();
  // logout Function Which Call in Logout Button
  const logoutOfApp = () => {
    dispatch(startLoading())
    authServices
      .logout()
      .then(() => {
        dispatch(logout());
        toast.error("logged out")
        navigate("/signin")

      })
      .catch((error) => {
        toast.error("error")
        //TODO: Server Error Future Improvement
      }).finally(() => {
        dispatch(stopLoading())
      });
  };


  const navItem = [
    {
      name: "Home",
      href: "/",
      active: true,
    },
    {
      name: "My Posts",
      href: "/posts",
      active: userStatus.status,
    },
    {
      name: "Add Posts",
      href: "/addpost",
      active: userStatus.status,
    },
    {
      name: "Sign Up",
      href: "/signup",
      active: !userStatus.status,
    },
    {
      name: "Sign In",
      href: "/signin",
      active: !userStatus.status,
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
  };
  //Header
  return (
    <div className="
    sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-100/10  supports-backdrop-blur:bg-white/60 bg-transparent
    ">
      <div className=" basis-[0]  mx-auto flex max-w-7xl items-center justify-between lg:justify-normal w-full px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <div className="inline-flex items-center  space-x-2">
            <span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="white"
                ></path>
              </svg>
            </span>
            <span className="font-bold hover:text-sky-500 ">Blog</span>
          </div>
        </Link>
        {/* 54 */}
        <div className="lg:w-[100%]  lg:relative  items-center justify-between lg:flex transition-all ease-in-out duration-1000">
          <div
            className={`lg:opacity-100 w-full absolute lg:relative duration-700  ease-in-out 
            ${isMobileMenuOpen ? "top-[0px] " : "top-[-214px] opacity-0"}
              left-0 lg:top-0 text-center bg-black lg:bg-transparent grow items-start lg:flex `}
          >

            <ul className="ml-5 lg:inline-flex lg:space-x-8">
              {navItem.map((value, index, array) => (
                <li className={`py-2 ${value.active ? " first-letter:" : "hidden"}`}
                  key={value.name}
                >
                  <Link
                    to={value.href}
                    onClick={handleLinkClick}
                    className={` text-md font-semibold hover:text-sky-500 text-center`}
                  >
                    {value.name}
                  </Link>
                </li>
              ))}
              <li className="py-2 lg:hidden"
              >
                <Link
                  to={"/EditProfile"}
                  onClick={handleLinkClick}
                  className={` text-md font-semibold hover:text-sky-500 text-center`}
                > UpdateProfile
                </Link>
              </li>

              <li className="py-2 lg:hidden"
              >
                <Link
                  onClick={()=>{
                    logoutOfApp()
                    handleLinkClick()
                  }}
                  className={` text-md font-semibold hover:text-sky-500 text-center`}
                > Logout
                </Link>
              </li>
            </ul>
          </div>


          <div className="hidden lg:block ">
            {userStatus.status && (
              <div className="flex ">
                {/* Search */}

                {/*DashBoard Btn*/}
                <Button
                  text={userStatus.userData?.name}
                  border="border border-black"
                  className="text-black bg-white hover:bg-slate-950 hover:text-white border-none"

                  onClick={() => navigate("/EditProfile")}
                />


                {/*Logout Btn*/}
                <Button
                  onClick={logoutOfApp}
                  className="bg-red-600 hover:bg-red-700 text-white border-none"
                  text="Logout"
                />
              </div>
            )}
          </div>

          <div className=" lg:hidden z-50 relative " onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>

        </div>
      </div>
    </div >

  );
}

export default Header;
