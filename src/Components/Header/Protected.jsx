import React, { useEffect } from 'react'
import { useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth)
  useEffect(() => {
    if (!authStatus.loaded) {
      return
    }
    // dispatch(startLoading())
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    // true && true = true false && false = true

    //let authValue = authStatus === true ? true : false

    if (authentication && authStatus.status !== authentication) {
      navigate('/signin')
    } else if (!authentication && authStatus.status !== authentication) {
      navigate('/')
    }
    // dispatch(stopLoading());
    // setLoading(false)
  }, [authStatus.status, authStatus.loaded, navigate, authentication])

  return <>{children}</>
}
