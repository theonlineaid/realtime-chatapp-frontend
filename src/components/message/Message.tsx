import { useAuthContext } from "../../contexts/AuthContext";
import { extractTime } from "../../utils/ExtractTime";
import useConversation from "../../zustan/useConversation";


interface MessageProps {
    message: {
        senderId: string;
        createdAt: string;
        message: string;
        shouldShake: boolean;
    };
}

export default function Message({ message }: MessageProps) {
    const { authUser } = useAuthContext(); // Add type annotation for authUser
    const { selectedConversation } = useConversation();

    const exacTrue = message.senderId === authUser?._id;
    console.log(exacTrue)
    const fromMe = exacTrue === true;
    const formattedTime: string = extractTime(message.createdAt); // Use the extractTime function
    const chatClassName: string = fromMe ? "chat-end" : "chat-start";
    const profilePic: string | undefined = fromMe ? authUser?.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor: string = fromMe ? "bg-blue-500" : "";

    const shakeClass: string = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} /> {/* Use default value for profilePic */}
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
}
