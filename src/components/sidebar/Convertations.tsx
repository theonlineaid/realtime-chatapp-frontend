import useGetConversations from '../../hooks/useGetConvertations'
import SingelConversation from './SingelConversation'

export default function Convertations() {
    const {conversations} = useGetConversations()

    console.log(conversations)
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
