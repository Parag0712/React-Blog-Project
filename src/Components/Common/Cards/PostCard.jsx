import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import fileService from '../../../appwrite/fileService'
import { Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import AnimationContainer from '../../Container/AnimationContainer'
function PostCard({ $id, title = "", featuredimage = "", content = "", className = "w-[300px]", status }) {
    const navigate = useNavigate()
    return (
        <AnimationContainer>
            <div className={` rounded-lg  text-slate-950 ${status == "inactive" ? "bg-slate-200" : "bg-white"} ${className}`}>
                <img
                    src={fileService.getFilePreview(featuredimage)}
                    alt={title}
                    className="h-[200px] w-full rounded-t-md object-cover"
                />
                <div className="p-4">
                    <h1 className="inline-flex items-center text-lg font-semibold">


                        {/* onClick={()=>navigate(`/post/${$id}`)} */}
                        {title} &nbsp;{status == "inactive" ?
                            <Link className='text-blue-800' to={`/edit-post/${$id}`}>
                                Click For Acitve
                            </Link>
                            : ""}
                    </h1>
                    <div className=" text-sm text-black">
                    {parse(content.slice(0, 30))}
                    {content.length > 30 && '...'}

                    </div>

                    <button
                        onClick={() => navigate(`/post/${$id}`)}
                        type="button"
                        className="mt-7 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Read
                    </button>
                </div>
            </div>
        </AnimationContainer>
    )
}
export default PostCard