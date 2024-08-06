import React, { Children } from 'react'

const Button = ({ children }) => {
    return (
        <button className="w-full h-8 rounded-lg bg-gray-800 hover:bg-gray-700">
            {children}
        </button>
    )
}

export default Button
