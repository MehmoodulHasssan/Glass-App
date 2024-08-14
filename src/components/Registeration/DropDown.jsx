'use client'
import React from 'react';

const Dropdown = ({ name, options }) => {
    const Pascalize = (name) => {
        return name[0].toUpperCase() + name.slice(1);
    }

    return (
        <div className="w-[20rem] flex flex-col gap-2">
            <label htmlFor={name} className="text-lg ml-1">
                {Pascalize(name)}
            </label>
            <select
                id={name}
                name={name}
                required
                className="input input-bordered max-w-xs w-full h-10 bg-gray-800"
            >
                <option value="" disabled selected hidden>
                    {`Select ${Pascalize(name)}`}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
