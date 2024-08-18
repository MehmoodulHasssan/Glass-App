'use client'
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ConversationsList from '@/components/ChatBox/sidebar/ConversationsList'
import SearchBar from '@/components/ChatBox/sidebar/SearchBar'
import ActiveChatContainer from '@/components/ChatBox/chatContainer/ActiveChatContainer';
import NoChatContainer from '@/components/ChatBox/chatContainer/NoChatContainer';
import useFetch from '@/hooks/useFetch';
import usePost from '@/hooks/usePost';
import { useAuthSelected} from '@/store/AuthSelectedContext';
import { useSocket } from '@/store/SocketContext';

// const socket = io('http://localhost:8000'); // Connect to the server
const ChatPage = () => {
    const {selectedChat, currentState} =useAuthSelected()
    const {socket, onlineUsers} =useSocket()
    const [message, setMessage] = useState('');
    const [displayMessages, setDisplayMessages] = useState([])
    const {data,isLoading,isError,fetchData,}  = useFetch()
    const {isError:sendingFailed, isLoading:sending, isSuccess:sent, postData:sendMessage, setIsSuccess:setSent} = usePost()

    console.log(selectedChat)
    console.log(onlineUsers)
        useEffect(() => { 
            if (selectedChat && selectedChat.messages.messages?.length > 0) {
                const chatMessages = selectedChat.messages.messages.map((message) => {
                    if (message.receiverId === selectedChat.id) {
                        return {
                            sent: {
                                message: message.message,
                                time: message.updatedAt,
                            }
                        };
                    } else {
                        return {
                            received: {
                                message: message.message,
                                time: message.updatedAt,
                            }
                        };
                    }
                });
                setDisplayMessages(chatMessages);
        } else {
            setDisplayMessages([]);
        }
    }, [selectedChat])

        useEffect(() => {
            const fetch = async () => {
                await fetchData('http://localhost:8000/api/users')                
            }
            if(currentState === 'loggedIn'){
                fetch()                
            }
        }, [])

        useEffect(() => {
                    socket?.on('message', (message) => {
                        console.log({received: message})
            setDisplayMessages((prevMessages) => [...prevMessages, { received: {
                message: message.message,
                time: message.updatedAt,
            } }]);
        })

        return () => {
            socket?.off('message'); // Clean up event listener
            // socket.disconnect(); // Close the socket connection
        };
    }, [socket, displayMessages, setDisplayMessages])

    const handleSend =async  (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        await sendMessage({url: `http://localhost:8000/api/message/send/${selectedChat.id}`,data: {message}})
        
    };

    useEffect(() => {
        if(sent){
            setDisplayMessages((prevMessages) => [...prevMessages, { sent: {
                message, 
                time: Date.now()
            }}]);
            setMessage('');
            setSent(false)
        }
    }, [sent])
    console.log(displayMessages)

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='flex text-slate-200 m-auto backdrop-blur-lg h-[34rem] w-10/12 divide-x-2 divide-slate-300'>
                <div className='relative flex flex-col gap-4 w-4/12 p-8'>
                    <SearchBar />
                    <ConversationsList
                        data={data}
                        />
                </div>
                {selectedChat && <ActiveChatContainer
                    displayMessages={displayMessages}
                    sendMessage={handleSend}
                    setMessage={setMessage}
                    message={message}
                    username={selectedChat?.username}
                    profilePic={selectedChat?.profilePic}
                    />}
                {!selectedChat && <NoChatContainer />}
            </div>
        </div>
    )
}


export default ChatPage

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Socket.IO connected');
    //     });
    
    //     socket.on('message', (message) => {
    //         setDisplayMessages((prevMessages) => [...prevMessages, { received: message.message }]);
    //         // alert(message.message);
    //     });
    
    //     socket.on('disconnect', () => {
    //         console.log('Socket.IO disconnected');
    //     });
    
    //     return () => {
    //         socket.off('message'); // Clean up event listener
    //         // socket.disconnect(); // Close the socket connection
    //     };
    // }, []);
    // console.log(displayMessages)