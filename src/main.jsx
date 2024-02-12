import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './App/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AddPost, Home, SignUpPage, MyPost, ErrorPage, SignInPage, PostPage } from './pages/index.js'

import { motion, AnimatePresence } from 'framer-motion'
import { Protected } from './Components/index.js'
import EditPost from './pages/EditPost.jsx'
import EditProfile from './pages/EditProfile.jsx'


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
         <Route path='' element={
            <Protected authentication={true}>
               <Home />
            </Protected>
         } />
           <Route path='EditProfile' element={
            <Protected authentication={true}>
               <EditProfile />
            </Protected>
         } />
         <Route path='posts' element={
            <Protected authentication={true}>
               <MyPost />
            </Protected>
         } />
         <Route path='addpost' element={
            <Protected authentication={true}>
               <AddPost />
            </Protected>
         } />
         <Route path='edit-post/:slug' element={
            <Protected authentication={true}>
               <EditPost />
            </Protected>
         } />
         <Route path='post/:postid' element={
            <Protected authentication={true}>
               <PostPage />
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
   <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
   </Provider>
)