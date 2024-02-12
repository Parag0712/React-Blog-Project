import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authServices from "./appwrite/auth";
import { login, logout, startLoading, stopLoading, authLoaded, authLoading } from "./App/authSlice";
import { Footer, Header, Loading } from "./Components";
import { ErrorPage } from "./pages/index";
import { motion, useAnimation } from "framer-motion";
import { Outlet } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [serverError, setServerError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading)
  const controls = useAnimation();
  useEffect(() => {
    // Run the animation whenever the component renders or loading state changes
    controls.start({ opacity: loading ? 0 : 1 });
  }, [loading, controls]);


  // Check User Login Or Not
  useEffect(() => {
    dispatch(authLoading())
    authServices
      .getCurrentUser()
      .then((userData) => {
        // console.log(userData);
        // alert("i am Loading")
        //if userData not empty then login in redux else
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        // setServerError(true);
        setErrorMsg(error)
      })
      .finally(() => {
        dispatch(authLoaded())
        dispatch(stopLoading())
      });
  }, [dispatch]);
  return (
    <div className="">
      {!serverError ? (
        <>
          {loading && <Loading></Loading>}
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={` bg-black text-white flex flex-col justify-between ${loading ? "hidden" : ""}`} >


            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Header></Header>
            <main className="my-9 min-h-[450px]">
              <Outlet />
            </main>
            <Footer></Footer>
          </motion.div>
        </>
      ) : (
        <ErrorPage errormsg={errorMsg} />
      )
      }
    </div>
  );
}

export default App;