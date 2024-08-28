import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Outgoing from './Outgoing'
import Incomming from './Incomming'
import { LuSend } from "react-icons/lu";
import { useAuthSelected } from '@/store/AuthSelectedContext'
import { IoArrowBackOutline } from "react-icons/io5";

const ActiveChatContainer = ({ displayMessages, message, setMessage, sendMessage, username, profilePic: receiverProfile }) => {
    const messageEndRef = useRef(null);
    const { profilePic: userProfile, handleOpenChatContainer, openChatContainer } = useAuthSelected()

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth', block: 'end' });
    };
    useEffect(() => {
        scrollToBottom()
    }, [displayMessages])
    return (
        <div className={`relative ${openChatContainer ? 'flex' : 'hidden'} flex-col w-full h-full justify-between lg:flex lg:h-[34rem] lg:w-8/12`}>
            <div className='flex items-center gap-1 sticky top-0 bg-slate-500 px-2 h-12 w-'>
                <div
                    className='flex mr-3 items-center text-slate-200 bg-gray-400 p-1 rounded-full'
                    onClick={() => handleOpenChatContainer(false)}
                >
                    <IoArrowBackOutline />
                </div>
                <div className='text-gray-800 text-lg font-bold'><span className='text-slate-200'>To:</span> {username}</div>
            </div>
            <div className='h-full overflow-scroll'>
                {displayMessages?.length > 0 && displayMessages.map((message, index) => {
                    return (
                        <>
                            {message.sent && <Outgoing
                                key={Math.random()}
                                message={message.sent}
                                profilePic={userProfile}
                            />}
                            {message.received && <Incomming
                                key={Math.random()}
                                message={message.received}
                                profilePic={receiverProfile}
                            />}
                            {index === displayMessages.length - 1 && <div ref={messageEndRef} />}
                        </>
                    )
                })}
            </div>
            <form onSubmit={sendMessage} className='flex justify-center items-center w-full gap-2 sticky bottom-0 py-2 lg:py-0'>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-10/12 rounded-full h-10 bg-gray-700"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <LuSend
                    type='submit'
                    onClick={sendMessage}
                    className="text-white w-6 h-6 mr-4"
                />
            </form>
        </div>
    )
}

export default ActiveChatContainer
