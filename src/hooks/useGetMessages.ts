import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustan/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/v1/messages/${selectedConversation._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include credentials in the request
                });
                
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};
export default useGetMessages;