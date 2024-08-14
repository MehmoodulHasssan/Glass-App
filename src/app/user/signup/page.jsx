'use client'
import React, { useActionState } from 'react';
import InputBar from '@/components/Registeration/InputBar';
import Button from '@/components/Registeration/Button';
import Wrapper from '@/components/Registeration/Wrapper';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/Registeration/DropDown';


const SignupPage = () => {
    const router = useRouter()
    const handleSubmit = (formData) => {
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Wrapper action={handleSubmit}>
                <h1 className="text-3xl font-semibold">
                    Sign Up <span className="text-blue-400">GlassApp</span>
                </h1>
                <InputBar type="text" name="username" />
                <InputBar type="email" name="email" />
                <Dropdown name="gender" options={['Male', 'Female']} />
                <InputBar type="text" name="phone" />
                <InputBar type="password" name="password" />

                <div className="flex flex-col gap-2 w-full">
                    <p onClick={() => router.push('/user/login')} className='hover:text-slate-300 hover:cursor-pointer'>Already have an account?</p>
                    <Button>Signup</Button>
                </div>
            </Wrapper>
        </div>
    );
};

export default SignupPage;
