import useGetConversations from '../../hooks/useGetConvertations'
import { getRandomEmoji } from '../../utils/RandomEmoji';

export default function Convertations() {
    const { loading, conversations } = useGetConversations();
    console.log(conversations)
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <div key={conversation._id} className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
                    <div className={`avatar`}>
                        <div className='w-12 rounded-full'>
                            <img src={conversation.profilePicture} alt='user avatar' />
                        </div>
                    </div>

                    <div className='flex flex-col flex-1'>
                        <div className='flex gap-3 justify-between'>
                            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                            <span className='text-xl'>{getRandomEmoji()}</span>
                        </div>
                    </div>
                </div>
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
}
