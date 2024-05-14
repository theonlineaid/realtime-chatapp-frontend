//@ts-nocheck

import React from "react";
import { extractTime } from "../../utils/ExtractTime";
import { useAuthContext } from "../../contexts/AuthContext";

interface MessageContentProps {
  message: {
    senderId: string;
    createdAt: string;
    message: string;
    shouldShake: boolean;
  };
  authUserId: string | undefined;
  selectedConversation: {
    profilePicture?: string;
  } | null;
}

const MessageContent: React.FC<MessageContentProps> = ({ message, authUserId, selectedConversation }) => {
  const { authUser } = useAuthContext();

  const fromMe = message.senderId === authUserId;
  const formattedTime: string = extractTime(message.createdAt);
  const chatClassName: string = fromMe ? "chat-end" : "chat-start";
  const profilePic: string | null | undefined = fromMe ? authUser?.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor: string = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs text-white flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default MessageContent;
