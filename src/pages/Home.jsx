import React, { useEffect, useState } from 'react'
import { AnimationContainer, Button, CardContainer, Container, Input, LoginForm, PostCard, SignupForm } from '../Components'
import appWriteService from '../appwrite/dbConfig'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../App/authSlice'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'

function Home() {

    const [post, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startLoading())
        appWriteService.getAllPost([Query.equal("status", "active")]).
            then((postData) => {
                if (postData) {
                    setPosts(postData.documents)
                }
            }).finally(() => {
                dispatch(stopLoading())
            })
    }, [dispatch])


    const searchFunction = (e) => {
        e.preventDefault()
        setSearch(e.currentTarget.value)
    }


    const filteredPosts = post.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            {
                post.length == 0 ? (
                    <div className='flex justify-center items-center text-white text-center'>
                        <h1 className='cursor font-bold tracking-[0.5rem] selection:bg-transparent text-[50px]'><Link to="/addpost">Create Post</Link></h1>
                    </div>
                ) : (<>
                    <div className="mb-8 max-w-7xl m-auto flex grow justify-center">
                        <input
                            className="w-[60%]  shadow-sm flex px-3 py-3 text-slate-950  rounded-[1px] bg-gray-100  text-sm placeholder:text-slate-950 focus:outline-none focus:ring-1 focus:ring-slate focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Serach"
                            value={search}
                            onChange={searchFunction}
                        />
                    </div>
                    <CardContainer >
                        {filteredPosts.length === 0 ? (
                            <div className='text-center text-gray-500'>
                                No matching posts found.
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <PostCard
                                    key={post.$id}
                                    $id={post.$id}
                                    title={post.title}
                                    featuredimage={post.featuredimage}
                                    content={post.content}
                                    className='w-[300px]'
                                ></PostCard>
                            ))
                        )}
                    </CardContainer>
                </>
                )
            }
        </>
    )
}

export default Home