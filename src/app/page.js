'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="h-screen">
      Welcome home
      <button
        onClick={() => router.push('/user/login')}
        className="btn btn-neutral"
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
