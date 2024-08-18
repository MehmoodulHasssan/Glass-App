import React from 'react'
import { getTime, getDate } from '@/utils/date&time'

const Incomming = ({ message }) => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">{getDate(message.time)}</time>
            </div>
            <div className="chat-bubble">{message.message}</div>
            <div className="chat-footer opacity-50">Received at {getTime(message.time)}</div>
        </div>
    )
}

export default Incomming
