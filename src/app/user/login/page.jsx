'use client'
import React, { useEffect } from 'react';
import InputBar from '@/components/Registeration/InputBar';
import Button from '@/components/Registeration/Button';
import Wrapper from '@/components/Registeration/Wrapper';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import usePost from '@/hooks/usePost';
import { useAuthSelected } from '@/store/AuthSelectedContext';


const LoginPage = () => {
    const { handleLogin } = useAuthSelected()
    const router = useRouter()
    const { isError,
        setIsError,
        isLoading,
        isSuccess,
        postData,
        resData
    } = usePost()

    const handleSubmit = async (formData) => {
        const data = Object.fromEntries(formData.entries())
        await postData({ url: 'http://localhost:8000/api/auth/login', data })
    }

    useEffect(() => {
        if (isSuccess) {
            handleLogin(resData.token)
            router.push('/user/chat');
        }
    }, [isSuccess, router]);

    useEffect(() => {
        if (isError.state) {
            toast.error(isError.data.message);
            setIsError({ state: false, data: '' });
        }
    }, [isError, setIsError]);

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Toaster />
            <Wrapper action={handleSubmit}>
                <h1 className="text-3xl font-semibold">
                    Login <span className="text-blue-400">GlassApp</span>
                </h1>
                <InputBar type="email" name="email" />
                <InputBar type="password" name="password" />
                <div className="flex flex-col gap-2 w-full">
                    <p onClick={() => router.push('/user/signup')} className='hover:text-slate-300 hover:cursor-pointer'>Not have an account?</p>
                    <Button>{isLoading ? 'Logging In...' : 'Login'}</Button>
                </div>
            </Wrapper>
        </div>
    );
};

export default LoginPage;
