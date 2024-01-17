import React, { useId } from 'react'

function Select({
    label = "DropDown",
    className = "",
    width = "w-full",
    options = [],
    ...props
}, ref) {
    const id = useId()
    return (
        <>
            {label && (
                <label htmlFor={id} className="text-base font-medium text-white-900">
                    {label}
                </label>
            )
            }
            <select
                id={id}
                className={`flex text-slate-950 h-10  rounded-md border border-white-300 bg-gray-100 px-3 py-2 text-sm placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 
                    ${className + ' ' + width}`}
                ref={ref}
                {...props}
            >
                {
                    options?.map((value, index, array) => {
                        return <option key={value} value={value}>{value}</option>
                    })
                }
            </select>
        </>
    )
}

export default React.forwardRef(Select)