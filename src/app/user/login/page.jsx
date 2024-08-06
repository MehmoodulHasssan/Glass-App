'use client'
import React from 'react';
import InputBar from '@/components/Registeration/InputBar';
import Button from '@/components/Registeration/Button';
import Wrapper from '@/components/Registeration/Wrapper';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter()
    const handleSubmit = (formData) => {
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Wrapper action={handleSubmit}>
                <h1 className="text-3xl font-semibold">
                    Login <span className="text-blue-400">GlassApp</span>
                </h1>
                <InputBar type="email" name="email" />
                <InputBar type="password" name="password" />
                <div className="flex flex-col gap-2 w-full">
                    <p onClick={() => router.push('/user/signup')} className='hover:text-slate-300 hover:cursor-pointer'>Not have an account?</p>
                    <Button>Login</Button>
                </div>
            </Wrapper>
        </div>
    );
};

export default LoginPage;
