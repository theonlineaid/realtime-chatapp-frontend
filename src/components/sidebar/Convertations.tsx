import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/RandomEmoji";
import SingleConversation from "./SingleConversation";

export default function Convertations() {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <SingleConversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}
