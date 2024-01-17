import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './App/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AllPost, ErrorPage } from './Pages/index.js'
import SignInPage from './pages/SignInUp/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Protected } from './Components/index.js'

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route
         path="/"
         element={
            <AnimatePresence mode="wait">
               <motion.div
                  key={window.location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
               >
                  <App />
               </motion.div>
            </AnimatePresence>
         }
      >
         <Route path='posts' element={
            <Protected authentication={true}>
               <AllPost />
            </Protected>
         } />
         <Route path='signin' element={

            <Protected authentication={false}>
               <SignInPage />
            </Protected>

         } />
         <Route path='signup' element={
            <Protected authentication={false}>
               <SignUpPage />
            </Protected>

         } />
         <Route path="*" element={<ErrorPage errormsg="Page Not Found" />} />
      </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router}>
         </RouterProvider>
      </Provider>
   </React.StrictMode>
)
