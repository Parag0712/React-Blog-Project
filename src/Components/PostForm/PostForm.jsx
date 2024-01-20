import Container from '../Container/Container'
import { Input, Rte, FormButton, Select } from '../Common';
import React, { useCallback, useEffect, useState } from 'react'

import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import fileService from '../../appwrite/fileService';
import appWriteService from '../../appwrite/dbConfig';
import { useDispatch, useSelector } from 'react-redux'
import placeImg from '../../assets/placeholder.png';
import { startLoading, stopLoading } from '../../App/authSlice';
import parse from 'html-react-parser'
import AnimationContainer from '../Container/AnimationContainer';

function PostForm({ post, edit = false }) {
    if (edit) {
        if (!post) {
            return 
        }
    }
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // UseForm
    const unique_id = uuid()
    const userAuth = useSelector((state) => state.auth)


    // submit  Method
    const submit = async (data) => {

        dispatch(startLoading())
        if (post) {
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null
            // Delete
            if (file) {
                fileService.deleteFile(post.featuredimage)
            }
            const dbPost = await appWriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined
            })
            if (dbPost) {

                dispatch(stopLoading())
                navigate(`/post/${dbPost.$id}`)

            }
        } else {
            if (data.image[0]) {
                const file = await fileService.uploadFile(data.image[0]);
                const fileId = file.$id
                if (file) {
                    // featuredImage
                    data.featuredimage = fileId;
                    try {
                        const dbPost = await appWriteService.createPost({ ...data, userid: userAuth.userData.$id });
                        if (dbPost) {
                            dispatch(stopLoading())
                            navigate(`/post/${dbPost.$id}`)
                        }
                    } catch (error) {
                        setError(error.message)
                    }
                }
            } else {

                setError("UploadFile");
            }
        }
        dispatch(stopLoading())

    }

    const [selectedImage, setSelectedImage] = useState(null);
    // slugTransformMethod
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            const baseSlug = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
            const finalSlug = `${baseSlug}-${unique_id}`.substr(0, 36);
            return finalSlug;
        }
        else {
            return "";
        }
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Display image preview
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    const [error, setError] = useState("");
    return (
        
        <AnimationContainer>
        <Container>
            <form onSubmit={handleSubmit(submit)} className='rounded-md m-auto bg-white text-black px-8 py-10'>
                <h2 className="w-full text-center text-2xl font-bold leading-tight ">
                    {post ? "Update" : 'Add New'} Post
                </h2>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 mb-3 lg:gap-[30px] mt-2">
                    <div className="flex items-center justify-center ">
                        <section className='w-full'>
                            <div className="flex items-center justify-center w-full  py-10  sm:py-16  lg:py-0">
                                <div className="w-full">
                                    <p className=" mt-1 text-xs italic text-red-500 text-center">{error}</p>
                                    <div className="mt-3">
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                label="Title :"
                                                width="w-full"
                                                placeholder="Title"
                                                {...register("title", { required: true })}

                                            ></Input>
                                            <Input
                                                label="Slug"
                                                width="w-full"
                                                placeholder="Slug"
                                                {...register("slug", { required: true })}
                                                onInput={(e) => {
                                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                                                }}
                                                readOnly
                                            ></Input>
                                            <Select
                                                label="Status"
                                                options={["active", "inactive"]}
                                                className="mt-0 bg-slate-100"
                                                {...register("status", { required: true })}
                                                onInput={(e) => {
                                                    setValue("status",e.currentTarget.value)
                                                }}
                                            >
                                            </Select>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="flex items-center justify-center">
                        <section className='w-full'>
                            <div className="flex items-center justify-center w-full   lg:py-0">
                                <div className="w-full">
                                    <p className=" mt-1 text-xs italic text-red-500 text-center">{error}</p>
                                    <div className="mt-3">
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                label="Featured Image :"
                                                type="file"
                                                width="w-full"
                                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                                className="bg-gray-100 mt-0"
                                                {...register("image", { required: !post })}
                                                onChange={handleImageChange}
                                            ></Input>
                                            <div className="w-full">
                                                <img
                                                    src={selectedImage ? selectedImage : post ? fileService.getFilePreview(post.featuredimage) : placeImg}
                                                    alt="Selected Preview"
                                                    className="rounded-lg max-h-[180px] min-h-[180px] w-full object-cover overflow-hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Rte label='Content :'
                    defaultValue={getValues('content') || ''}
                    name="content"
                    control={control}
                >

                </Rte>
                <FormButton
                    text={post ? "Update Post" : "Create Post"}
                    type="submit"
                    className="mt-3 bg-slate-950 hover:bg-black text-white hover:text-white"
                    icon={<ArrowRight className="ml-2" size={16} />}
                />
            </form>
        </Container>
        </AnimationContainer>
    )
}

export default PostForm