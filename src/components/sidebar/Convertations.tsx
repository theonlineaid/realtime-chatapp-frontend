import React from 'react'
import SingelConversation from './SingelConversation'

export default function Convertations() {
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <SingelConversation />
            <SingelConversation />
            <SingelConversation />
            <SingelConversation />
            <SingelConversation />
        </div>
    )
}
