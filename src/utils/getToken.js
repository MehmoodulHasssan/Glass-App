'use client';
export const getToken = () => {
  const value = `; ${document.cookie}`;
  console.log(value);
  const parts = value.split(`; token=`);
  if (parts.length === 2) {
    console.log(parts);
    return parts.pop().split(';').shift();
  }
};
