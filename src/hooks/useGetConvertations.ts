import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define types for the conversation data
interface Conversation {
    id: string;
    name: string;
    // Add more properties as needed
    error: string;
}

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/v1/users/", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include credentials in the request
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch conversations");
                }

                const data: Conversation[] = await res.json();
                setConversations(data);
            } catch (error) {
                console.error("Error fetching conversations:", error);
                toast.error("Failed to fetch conversations");
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
