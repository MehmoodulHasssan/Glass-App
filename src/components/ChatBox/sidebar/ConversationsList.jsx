import React, { useEffect } from 'react'
import Conversation from './Conversation'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { useAuthSelected } from '@/store/AuthSelectedContext'

const ConversationsList = ({ data }) => {
    const router = useRouter()
    const { handleLogout } = useAuthSelected()
    const { isError,
        isLoading,
        isSuccess,
        postData, } = usePost()
    const logout = async () => {
        await postData({ url: 'http://localhost:8000/api/auth/logout' })
    }

    useEffect(() => {
        if (isSuccess) {
            handleLogout()
            router.push('/user/login')
        }
    }, [isSuccess, router])


    return (
        <>
            <ul className='flex flex-col divide-y-2 divide-slate-300 overflow-scroll'>
                {data?.map((conversation) => (
                    <Conversation key={conversation._id} conversation={conversation} />
                ))}
            </ul>
            <div className='absolute top-0 left-0'>
                <button onClick={logout}>Logout</button>
            </div>
        </>

    )
}

export default ConversationsList
