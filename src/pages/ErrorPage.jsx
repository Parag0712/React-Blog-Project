import React from 'react'
import { AnimationContainer } from '../Components'

function ErrorPage({errormsg="Server Error 404"}) {
  return (
    <AnimationContainer>
      
    <div className='flex justify-center items-center h-screen w-screen text-white text-center'>
      <h1 className='font-bold tracking-[0.5rem] selection:bg-transparent text-[50px]'>{errormsg}</h1>
    </div>
    </AnimationContainer>
  )
}

export default ErrorPage