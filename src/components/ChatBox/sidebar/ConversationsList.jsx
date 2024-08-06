import React from 'react'
import Conversation from './Conversation'

const ConversationsList = () => {
    return (
        <ul className='flex flex-col divide-y-2 divide-slate-300 overflow-scroll'>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />

        </ul>
    )
}

export default ConversationsList
