import React, { useEffect, useState } from 'react'
import { Container, AnimationContainer, PostForm } from '../Components'
import { useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../appwrite/dbConfig'
import fileService from '../appwrite/fileService'

function EditPost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPosts] = useState(null)

    useEffect(() => {
        if (slug) {
            appWriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPosts(post)
                    }
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return (
        <AnimationContainer>
            <Container>
                <PostForm post={post} edit="true"> </PostForm>
            </Container>
        </AnimationContainer>
    )
}

export default EditPost