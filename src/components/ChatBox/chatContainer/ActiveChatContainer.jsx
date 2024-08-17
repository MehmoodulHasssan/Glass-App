import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Outgoing from './Outgoing'
import Incomming from './Incomming'
import { LuSend } from "react-icons/lu";

const ActiveChatContainer = ({ displayMessages, message, setMessage, sendMessage }) => {
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth', block: 'end' });
    };
    useEffect(() => {
        scrollToBottom()
    }, [displayMessages])
    return (
        <div className='flex flex-col justify-between h-[34rem] w-8/12'>
            <div className='flex items-center gap-1 bg-slate-500 px-2 h-12 w-'>
                To: <span className='text-gray-800 text-lg font-bold'> Sam edwards</span>
            </div>
            <div className='h-full overflow-scroll'>
                {displayMessages.map((message, index) => {
                    return (
                        <>
                            {message.sent && <Outgoing key={index} message={message.sent} />}
                            {message.received && <Incomming key={index} message={message.received} />}
                            {index === displayMessages.length - 1 && <div ref={messageEndRef} />}
                        </>
                    )
                })}
            </div>
            <form onSubmit={sendMessage} className='flex justify-center items-center w-full gap-2'>
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
