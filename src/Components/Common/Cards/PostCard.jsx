import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import fileService from '../../../appwrite/fileService'
import { Link, useNavigate } from 'react-router-dom'

function PostCard({ $id, title="post", featuredimage="12121212", content="" }) {
    const navigate =  useNavigate()
    return (
            <div className="w-[300px] rounded-lg bg-white text-slate-950 ">
                <img
                    src={fileService.getFilePreview(featuredimage)}
                    alt={title}
                    className="h-[200px] w-full rounded-t-md object-cover"
                />
                <div className="p-4">
                    <h1 className="inline-flex items-center text-lg font-semibold">
                        {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
                    </h1>
                    <p className="mt-3 text-sm text-black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
                    </p>

                    <button
                        onClick={()=>navigate(`/post/${$id}`)}
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Read
                    </button>
                </div>
            </div>
    )
}
export default PostCard