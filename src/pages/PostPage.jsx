import React, { useEffect, useState } from 'react'
import { Container, AnimationContainer, PostForm, Button } from '../Components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../appwrite/dbConfig'
import fileService from '../appwrite/fileService'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import authServices from '../appwrite/auth'
import { startLoading, stopLoading } from '../App/authSlice'

function PostPage() {
    const { postid } = useParams()
    const navigate = useNavigate()
    const [post, setPosts] = useState()

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        dispatch(startLoading())
        if (postid) {
            appWriteService.getPost(postid)
                .then((value) => {
                    if (value) {
                        setPosts(value)
                    } else {
                        navigate('/')
                    }
                }).finally(()=>{
                    
                dispatch(stopLoading())
                })
        } else {
            navigate('/')
        }
    }, [postid, navigate])



    const deletePost = () => {
        if (postid) {
            const deletedPost = appWriteService.deletePost(postid)
                .then((value) => {
                    fileService.deleteFile(value.featuredimage);
                    navigate('/')
                })
            navigate('/')
        } else {
            navigate('/')
        }
    }
    return post ? (
        <AnimationContainer>
            <Container>
                <div className={`lg:min-h-[600px] py-2 pt-0 bg-white rounded-lg bg-transparent text-slate-950 m-auto w-[80%] relative`}>
                    <img
                        src={post?.featuredimage ? fileService.getFilePreview(post.featuredimage) : 'fallback-image-url'}
                        alt=""
                        className=" m-auto  rounded-md"
                    />
                    <div className=" p-4 ">
                        {
                            isAuthor && (
                                <div className="right-6 top-6 absolute">
                                    <Button
                                        text="Edit"
                                        onClick={() => navigate(`/edit-post/${post?.$id ?? 'Loadin'}`)}
                                        className="border-none bg-green-500 text-white py-3 px-4">
                                    </Button>
                                    <Button
                                        className="border-none bg-red-500 text-white py-3 px-4" type="button"
                                        text='Delete' onClick={deletePost}>
                                    </Button>
                                </div>
                            )
                        }

                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {post?.title ?? 'Loading...'} 
                        </h1>
                        <p className="mt-3 text-sm text-black">
                            {parse(post?.content ?? 'Loading...')}
                        </p>
                    </div>
                </div>
            </Container>
        </AnimationContainer>
    ) : null;
}

export default PostPage