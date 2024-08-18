import React, { useState } from 'react'
import { getDate, getTime } from '@/utils/date&time'

const Outgoing = ({ message, profilePic }) => {
    const [showDate, setShowDate] = useState(false)
    return (
        <div className="chat chat-start">
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
            <div className="chat-footer opacity-50">Sent at {getTime(message.time)}</div>
        </div>
    )
}

export default Outgoing
