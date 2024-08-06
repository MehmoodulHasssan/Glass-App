'use client'
import React from 'react'
import ConversationsList from '@/components/ChatBox/sidebar/ConversationsList'
import SearchBar from '@/components/ChatBox/sidebar/SearchBar'
import { LuSend } from "react-icons/lu";
import Incomming from '@/components/ChatBox/chatContainer/Incomming';
import Outgoing from '@/components/ChatBox/chatContainer/Outgoing';

const ChatPage = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='flex text-slate-200 m-auto backdrop-blur-lg h-[34rem] w-10/12 divide-x-2 divide-slate-300'>
                <div className='flex flex-col gap-4 w-4/12 p-8'>
                    <SearchBar />
                    <ConversationsList />
                </div>
                <div className='flex flex-col justify-between h-[34rem] w-8/12'>
                    <div className='flex items-center gap-1 bg-slate-500 px-2 h-12 w-'>
                        To: <span className='text-gray-800 text-lg font-bold'> Sam edwards</span>
                    </div>
                    <div className='h-full overflow-scroll'>
                        <Incomming />
                        <Outgoing />
                        <Incomming />
                        <Outgoing />
                        <Incomming />
                        <Outgoing />
                        <Incomming />
                        <Outgoing />
                    </div>
                    <div className='flex justify-center items-center w-full gap-2'>
                        <input type="text" placeholder="Type here" className="input input-bordered w-10/12 rounded-full h-10 bg-gray-700" />
                        <LuSend className="text-white w-6 h-6 mr-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
