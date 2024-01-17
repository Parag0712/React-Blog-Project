import React from 'react'

function Button({  text = '',  onClick,className="", type = "button" ,...props }) {
    return (
        <button  onClick={onClick} {...props}
            type="button"
            className={`mr-2 duration-100 ease-linear rounded-md  px-3 py-2 text-sm font-semibold  border shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
        >
            {text}
        </button>
    )
}

export default Button