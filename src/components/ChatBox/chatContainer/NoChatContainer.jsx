import React from 'react'
import { PiChatsCircleDuotone } from "react-icons/pi";

const NoChatContainer = () => {
    return (
        <div className='hidden lg:flex flex-col justify-center items-center h-[34rem] w-8/12'>
            <h1 className='text-3xl font-semibold'>Hello Mehmood</h1>
            <h1 className='text-3xl font-semibold'>Select any conversation and have fun!</h1>
            <PiChatsCircleDuotone className='text-5xl text-slate-300' />
        </div>
    )
}

export default NoChatContainer
