import React from 'react'

const Wrapper = ({ children, ...props }) => {
    return (
        <form {...props} className="flex flex-col gap-2 items-center text-slate-200 p-8 m-auto w-1/4 min-w-96 backdrop-blur-lg">
            {children}
        </form>
    )
}

export default Wrapper
