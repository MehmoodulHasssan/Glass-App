import React, { useEffect } from 'react'
import { useAuthSelected } from '@/store/AuthSelectedContext'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { SlLogout } from "react-icons/sl";

const LogoutButton = () => {
    const router = useRouter()
    const { handleLogout, handleOpenChatContainer } = useAuthSelected()
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
            handleOpenChatContainer(false)
            router.push('/user/login')
        }
    }, [isSuccess, router])
    return (
        <div
            className='absolute bottom-4 right-4 cursor-pointer'
            onClick={() => logout()}
        >
            <SlLogout className='text-2xl' />
        </div>
    )
}

export default LogoutButton
