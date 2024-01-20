import React, { useId } from 'react'

const Input = React.forwardRef(
    function Input({ 
        label = "",
        type = "text",
        className = "",
        width="w-full",
        placeholder = "PlaceHolder",
        error="",
        ...props
    }, ref) {
        const id = useId()
        return (
            <div>
                {label && (
                    <label htmlFor={id} className="text-base font-medium text-white-900">
                        {label}
                    </label>
                )
                }
                <div className="mt-2">
                    <input
                        id={id}
                        className={`flex text-black h-10 rounded-md border border-white-300  px-3 py-2 text-sm placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className +' '+width}`}
                        type={type}
                        placeholder={placeholder}
                        ref={ref}
                        {...props}
                    ></input>
                </div>

                <p className=" mt-1 text-xs italic text-red-500">{error}</p>
            </div>
        )
    }
)
export default Input