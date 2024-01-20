import React from 'react'
import { AnimationContainer, LoginForm } from '../Components'
import { motion } from 'framer-motion'

function SignInPage() {
    return (
        <AnimationContainer className="px-3">
            <LoginForm></LoginForm>
        </AnimationContainer>

    )
}

export default SignInPage