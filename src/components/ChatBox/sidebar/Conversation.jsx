import React from 'react'

const Conversation = () => {
    return (
        <li className='p-2 flex items-center justify-between hover:bg-sky-400 hover:text-white hover:cursor-pointer'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <p className='p-2 text-lg font-semibold'>John Abraham</p>
            <p className='text-sm font-bold'>Online</p>
        </li>
    )
}

export default Conversation
