'use client'
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ConversationsList from '@/components/ChatBox/sidebar/ConversationsList'
import SearchBar from '@/components/ChatBox/sidebar/SearchBar'
import { LuSend } from "react-icons/lu";
import Incomming from '@/components/ChatBox/chatContainer/Incomming';
import Outgoing from '@/components/ChatBox/chatContainer/Outgoing';

const socket = io('http://localhost:8000'); // Connect to the server
const ChatPage = () => {
    const messageEndRef = useRef(null);
    const [message, setMessage] = useState('');
    // const [receivedMessages, setReceivedMessages] = useState([]);
    // const [sentMessages, setSentMessages] = useState([]);
    const [displayMessages, setDisplayMessages] = useState([])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket.IO connected');
        });

        socket.on('message', (message) => {
            setDisplayMessages((prevMessages) => [...prevMessages, { received: message.message }]);
            scrollToBottom()
            // alert(message.message);
        });

        socket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
        });

        return () => {
            socket.off('message'); // Clean up event listener
            // socket.disconnect(); // Close the socket connection
        };
    }, []);
    console.log(displayMessages)

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        socket.emit('message', { message });
        setMessage('');
        setDisplayMessages((prevMessages) => [...prevMessages, { sent: message }]);
        scrollToBottom()
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behaviour: 'smooth', block: 'end' });
    };
    useEffect(() => {
        scrollToBottom()
    }, [displayMessages])


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
                    <form onSubmit={handleSend} className='flex justify-center items-center w-full gap-2'>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-10/12 rounded-full h-10 bg-gray-700"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <LuSend
                            type='submit'
                            onClick={handleSend}
                            className="text-white w-6 h-6 mr-4"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
