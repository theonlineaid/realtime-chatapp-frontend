import { useEffect } from "react";
import notificationSound from "../assets/notification.mp3";
import { useSocketContext } from "../contexts/SocketContext";
import useConversation from "../zustan/useConversation";

interface Message {
  senderId: string;
  createdAt: string;
  message: string;
  shouldShake: boolean;
  _id: string;
  [key: string]: any; // Adjust this if you have more specific fields
}

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
