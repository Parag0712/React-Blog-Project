import React from 'react'

function FormButton({img,type, text, icon,className="",onClick,...props }) {
    return (
        <>
            <button
                onClick={onClick}
                type={type}
                className={`$ mt-2 relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 px-3.5 py-2.5 font-semibold  transition-all duration-200  focus:bg-gray-100 focus:text-black focus:outline-none ${className}`}
            >
            {img}
            {text}
            {icon}
            </button>
        </>
    )
}

export default FormButton