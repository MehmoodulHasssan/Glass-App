import React, { useState } from 'react'
import { getTime, getDate } from '@/utils/date&time'

const Incomming = ({ message, profilePic }) => {
    const [showDate, setShowDate] = useState(false)
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={profilePic} />
                </div>
            </div>
            <div className="chat-header">
                <time className={`text-xs opacity-50 ${showDate ? '' : 'hidden'}`}>{getDate(message.time)}</time>
            </div>
            <div onClick={() => setShowDate(!showDate)} className="chat-bubble">{message.message}</div>
            <div className="chat-footer opacity-50">Received at {getTime(message.time)}</div>
        </div>
    )
}

export default Incomming
