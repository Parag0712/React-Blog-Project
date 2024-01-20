import React, { useEffect, useState } from 'react'
import { Container, AnimationContainer, PostForm, Button } from '../Components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../appwrite/dbConfig'
import fileService from '../appwrite/fileService'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import authServices from '../appwrite/auth'

function PostPage() {
    const { postid } = useParams()
    const navigate = useNavigate()
    const [post, setPosts] = useState()

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    console.log(userData);

    useEffect(() => {
        if (postid) {
            appWriteService.getPost(postid)
                .then((value) => {
                    if (value) {
                        console.log(value);
                        setPosts(value)
                    } else {
                        navigate('/')
                    }
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
                <div className={`min-h-[600px] py-2 rounded-lg bg-white text-slate-950 w-[100%]`}>
                    <img
                        src={post?.featuredimage ? fileService.getFilePreview(post.featuredimage) : 'fallback-image-url'}
                        alt=""
                        className=" h-[500px] m-auto  rounded-md"
                    />
                    <div className="p-4 relative">
                        {
                            isAuthor && (
                                <div className="right-6 top-6 absolute">
                                    <Button
                                        text="Edit"
                                        onClick={() => navigate(`/edit-post/${post?.$id ?? 'Loadin'}`)}
                                        className="bg-green-500 text-white py-3 px-4">
                                    </Button>
                                    <Button
                                        className="bg-red-500 text-white py-3 px-4" type="button"
                                        text='Delete'
                                        bgColor="bg-red-500" onClick={deletePost}>
                                    </Button>
                                </div>
                            )
                        }

                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {post?.title ?? 'Loading...'} <sub className='ml-2 font-thin'>Posted By </sub>
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