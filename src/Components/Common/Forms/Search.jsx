import React from 'react'
import { Button } from '../index'

function Search({ }) {
    return (
        <div className="flex grow justify-end">
            <input
                className="mr-2 shadow-sm flex h-10   text-slate-950 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-slate-950 focus:outline-none focus:ring-1 focus:ring-slate focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Serach"
            />
            <Button
                className="border  bg-black  text-white hover:bg-white hover:text-black"
                text="Search"
            />
        </div>
    )
}

export default Search