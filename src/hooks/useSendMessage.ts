import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustan/useConversation";

interface Message {
    // Define the structure of a message
    id: string;
    text: string;
    error?: string;
    // Add more properties as needed
}

const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include credentials in the request
                body: JSON.stringify({ message }),
            });
            const data: Message = await res.json(); // Set type to Message
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error: any | unknown) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
