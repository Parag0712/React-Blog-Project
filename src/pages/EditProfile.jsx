import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../Components'
import { FormButton } from '../Components/Common'
import authServices from '../appwrite/auth'
import { login, logout, startLoading, stopLoading } from '../App/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'




function EditProfile() {
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => {
        return state.auth.userData
    })
    const { register, handleSubmit, setValue } = useForm({
    })
    useEffect(() => {
        setValue('name', userData?.name)
        setValue('email', userData?.email)
    }, [userData])

    const updateProfile = async (data) => {
        dispatch(startLoading())
        try {
            const updateProfile = await authServices.updateProfile(data)
            if (updateProfile) {
                authServices
                    .getCurrentUser()
                    .then((userData) => {
                        // console.log(userData);
                        // alert("i am Loading")
                        //if userData not empty then login in redux else
                        if (userData) {
                            dispatch(login({ userData }));
                            navigate('/')
                        } else {
                            dispatch(logout());
                        }
                    })
                    toast.success("Profile Updated")
                navigate('/')
            }
        } catch (error) {
            
            toast.error(error.message)
            setError(error.message)
        } finally {
            dispatch(stopLoading())
        }
    }
    return (
        <section className='max-w-[500px] px-2 py-8 border-[1px] text-black bg-white bg-wh rounded-lg border-white m-auto'>
            <div className=" flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-0">
                <div className=" w-full">
                    <h2 className="text-center text-2xl font-bold leading-tight ">
                        Update Profile
                    </h2>
                    <p className=" mt-1 text-xs italic text-red-500 text-center">{error}</p>
                    <form onSubmit={handleSubmit(updateProfile)} className="mt-8">
                        <div className="flex flex-col gap-2">

                            <Input
                                label="Name"
                                type="text"
                                width="w-full"
                                placeholder="Full Name"
                                error={`${nameError}`}
                                {...register("name", {
                                    validate: {
                                        matchPattern: (value) => {
                                            const isValid = /^[a-zA-Z\s]+$/.test(value);
                                            if (isValid) {
                                                setNameError("");  // Assuming `clearHelperError` is a function to clear the error message
                                            } else {
                                                setNameError("*Enter Valid Name without special characters");
                                            }
                                            return isValid;
                                        },
                                    }
                                })}
                            ></Input>
                            <Input
                                label="Email Address"
                                type="text"
                                width="w-full"
                                placeholder="Email Address"
                                error={`${emailError}`}
                                {...register("email", {
                                    validate: {
                                        matchPattern: (value) => {
                                            const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
                                            if (isValid) {
                                                setEmailError("");  // Assuming `clearHelperError` is a function to clear the error message
                                            } else {
                                                setEmailError("*Enter Valid Email");
                                            }
                                            return isValid;
                                        },
                                    }
                                })}
                            ></Input>
                            <Input
                                label="Password"
                                type="password"
                                width="w-full"
                                placeholder="Password"
                                error={`${passwordError}`}
                                {...register("password", {
                                    validate: {
                                        matchPattern: (value) => {
                                            const isValid = /^.{8,}$/.test(value);
                                            if (isValid) {
                                                setPasswordError(""); // Clear the error message
                                            } else {
                                                setPasswordError("Password must be at least 8 characters");
                                            }
                                            return isValid;

                                        }
                                    }
                                })}
                            ></Input>
                            <div className='mt-3'>
                                <FormButton
                                    text="Update Profile"
                                    type="submit"
                                    className='bg-slate-950 hover:bg-black hover:text-white text-white'
                                />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>

    )
}

export default EditProfile