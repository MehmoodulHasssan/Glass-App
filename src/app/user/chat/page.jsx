'use client'
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ConversationsList from '@/components/ChatBox/sidebar/ConversationsList'
import SearchBar from '@/components/ChatBox/sidebar/SearchBar'
import ActiveChatContainer from '@/components/ChatBox/chatContainer/ActiveChatContainer';
import NoChatContainer from '@/components/ChatBox/chatContainer/NoChatContainer';

const socket = io('http://localhost:8000'); // Connect to the server
const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [isActiveChat, setIsActiveChat] = useState(false)
    const [displayMessages, setDisplayMessages] = useState([])

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket.IO connected');
        });

        socket.on('message', (message) => {
            setDisplayMessages((prevMessages) => [...prevMessages, { received: message.message }]);
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
    };



    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='flex text-slate-200 m-auto backdrop-blur-lg h-[34rem] w-10/12 divide-x-2 divide-slate-300'>
                <div className='flex flex-col gap-4 w-4/12 p-8'>
                    <SearchBar />
                    <ConversationsList
                        setIsActiveChat={setIsActiveChat}
                    />
                </div>
                {isActiveChat && <ActiveChatContainer
                    displayMessages={displayMessages}
                    sendMessage={handleSend}
                    setMessage={setMessage}
                    message={message}
                />}
                {!isActiveChat && <NoChatContainer />}
            </div>
        </div>
    )
}

export default ChatPage
