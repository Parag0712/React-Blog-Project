import React from 'react'
import { AnimationContainer, Container, LoginForm, PostCard, SignupForm } from '../../Components'


function AllPost() {
    return (
        <AnimationContainer>
            <Container>
                <PostCard></PostCard>
                <PostCard></PostCard>
                <PostCard></PostCard>
                <PostCard></PostCard>
            </Container>
        </AnimationContainer>
    )
}

export default AllPost