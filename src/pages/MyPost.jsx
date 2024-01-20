import React, { useEffect, useState } from 'react'
import { AnimationContainer, CardContainer, Container, LoginForm, PostCard, SignupForm } from '../Components'
import appWriteService from '../appwrite/dbConfig'
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from '../App/authSlice'
import { Query } from 'appwrite'
import { Heading1 } from 'lucide-react'
import { Link } from 'react-router-dom'
function MyPost() {

    const [post, setPosts] = useState([])
    const dispatch = useDispatch()
    const userId = useSelector((state) => {
        return state.auth.userData
    })
    useEffect(() => {
        dispatch(startLoading())
        appWriteService.getAllPost([Query.equal("userid", userId?.$id)]).
            then((postData) => {
                if (postData) {
                    setPosts(postData.documents)
                }
            }).finally(() => {
                dispatch(stopLoading())
            })
    }, [dispatch,userId]);

    return (
        <>
            {
                post.length == 0 ? (
                    <div className='flex justify-center items-center text-white text-center'>
                        <h1 className='cursor font-bold tracking-[0.5rem] selection:bg-transparent text-[50px]'><Link to="/addpost">Create Post</Link></h1>
                    </div>
                ) : (
                    <CardContainer >
                        {
                            post.map((posts) => {
                                return <PostCard
                                    key={posts.$id}
                                    $id={posts.$id}
                                    title={posts.title}
                                    
                                    status={posts.status}
                                    featuredimage={posts.featuredimage}
                                    content={posts.content}
                                    className='w-[300px]'
                                ></PostCard>
                            })
                        }
                    </CardContainer>
                )
            }
        </>
    )
}

export default MyPost