'use client'
import React, { useEffect } from 'react';
import InputBar from '@/components/Registeration/InputBar';
import Button from '@/components/Registeration/Button';
import Wrapper from '@/components/Registeration/Wrapper';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/Registeration/DropDown';
import usePost from '@/hooks/usePost';
import validiateData from '@/utils/validiateData';
import toast, { Toaster } from 'react-hot-toast';
import FileInput from '@/components/Registeration/FileInput';


const SignupPage = () => {
    const router = useRouter()
    const { isError,
        setIsError,
        isLoading,
        isSuccess,
        postData,
    } = usePost()

    const handleSubmit = async (formData) => {
        const data = Object.fromEntries(formData.entries())
        if (!validiateData(data)) return;
        await postData({ url: 'http://localhost:8000/api/auth/signup', data: formData })
    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/user/login');
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
                    Sign Up <span className="text-blue-400">GlassApp</span>
                </h1>
                <InputBar type="text" name="username" />
                <InputBar type="email" name="email" />
                {/* <Dropdown name="gender" options={['Male', 'Female']} /> */}
                <InputBar type="text" name="phone" />
                <InputBar type="password" name="password" />
                <FileInput />
                <div className="flex flex-col gap-2 w-full">
                    <p onClick={() => router.push('/user/login')} className='hover:text-slate-300 hover:cursor-pointer'>Already have an account?</p>
                    <Button>{isLoading ? 'Signing Up...' : 'Signup'}</Button>
                </div>
            </Wrapper>
        </div>
    );
};

export default SignupPage;
