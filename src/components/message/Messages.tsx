//@ts-nocheck

import { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthContext } from "../../contexts/AuthContext";
import useConversation from "../../zustan/useConversation";
import { extractTime } from "../../utils/ExtractTime";


export default function Messages() {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { selectedConversation } = useConversation();

  const fromMe = messages.some(message => message.senderId === authUser?._id);
  const chatClassName: string = fromMe ? "chat-end" : "chat-start";
  const profilePic: string | undefined = fromMe ? authUser?.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor: string = fromMe ? "bg-blue-500" : "";


  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.map((message, index) => (
        <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
          <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img alt='Tailwind CSS chat bubble component' src={profilePic} />
              </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
              {message.message}
            </div>
            {message.createdAt && (
              <>
                <div className='chat-footer opacity-50 text-xs text-white flex gap-1 items-center'>
                  {message.createdAt}
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
}