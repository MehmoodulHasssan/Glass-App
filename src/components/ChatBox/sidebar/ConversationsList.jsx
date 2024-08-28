import React, { useEffect } from 'react'
import Conversation from './Conversation'

const ConversationsList = ({ data }) => {


    return (
        <>
            <ul className='flex flex-col divide-y-2 divide-slate-300 overflow-scroll'>
                {data?.map((conversation) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation} />
                ))}
            </ul>
        </>

    )
}

export default ConversationsList
