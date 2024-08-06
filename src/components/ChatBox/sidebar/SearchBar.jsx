import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'

const SearchBar = () => {
    return (
        <div className='flex items-center gap-2 px-3'>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-full h-10 bg-gray-700" />
            <IoSearchSharp className='text-3xl p-1 bg-sky-400 rounded-full w-12 h-10' />
        </div>
    )
}

export default SearchBar
