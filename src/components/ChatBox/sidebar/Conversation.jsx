import React, { useEffect, useState } from 'react'
import { useAuthSelected } from '@/store/AuthSelectedContext'
import useFetch from '@/hooks/useFetch'
import { useSocket } from '@/store/SocketContext'

const Conversation = ({ conversation }) => {
    const { onlineUsers } = useSocket()
    const { handleCurrentChat, handleOpenChatContainer } = useAuthSelected()
    const [isOnline, setIsOnline] = useState(false)
    const { data,
        isLoading,
        isError,
        fetchData, } = useFetch()

    useEffect(() => {
        setIsOnline(false)
        onlineUsers.forEach((user) => {
            if (user.userId === conversation._id) {
                setIsOnline(true)
            }
        })
    }, [onlineUsers])

    const fetchChat = async () => {
        handleOpenChatContainer(true)
        await fetchData(`http://localhost:8000/api/message/${conversation._id}`)
    }
    useEffect(() => {
        if (data) {
            handleCurrentChat({
                username: conversation.username,
                id: conversation._id,
                messages: data.conversation,
                profilePic: conversation.profilePic
            })
        }
    }, [data])

    return (
        <li
            className='p-2 flex items-center justify-between hover:bg-sky-400 hover:text-white hover:cursor-pointer'
            onClick={fetchChat}
        >
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} />
                </div>
            </div>
            <p className='p-2 text-lg font-semibold'>{conversation.username}</p>
            <p className='text-sm font-bold'>{isOnline ? 'Online' : 'Offline'}</p>
        </li>
    )
}

export default Conversation
