import React from 'react'

function AuthButton({img,type, text, icon,...props }) {
    return (
        <>
            <button
                type={type}
                className="mt-2 relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
            {img}
            {text}
            {icon}
            </button>
        </>
    )
}

export default AuthButton