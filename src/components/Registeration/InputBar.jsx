'use client'
import React from 'react'

const InputBar = ({ name, type }) => {
    const Pascalize = (name) => {
        return name[0].toUpperCase() + name.slice(1);
    }
    return (
        <div className="w-[20rem] flex flex-col gap-2">
            <label htmlFor={name} className="text-lg ml-1">
                {Pascalize(name)}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={Pascalize(name)}
                required
                className="input input-bordered max-w-xs w-full h-10 bg-gray-800"
            />
        </div>
    )
}

export default InputBar;
