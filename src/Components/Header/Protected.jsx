import React, { Children, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startLoading, stopLoading } from '../../App/authSlice'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loader, setLoading] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    // true && true = true false && false = true

    //let authValue = authStatus === true ? true : false

    dispatch(startLoading());
    if (authentication && authStatus !== authentication) {
      navigate('/signin')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
    dispatch(stopLoading());
    // setLoading(false)
  }, [authStatus, navigate, authentication])

  return <>{children}</>
}
