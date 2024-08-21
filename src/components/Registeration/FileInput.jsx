import React from 'react'

const FileInput = () => {
    return (
        <div className="w-[20rem] flex flex-col gap-2">
            <input
                type="file"
                name='profilePic'
                className="file-input file-input-bordered w-full max-h-10 bg-gray-700 max-w-xs" />
        </div>
    )
}

export default FileInput
