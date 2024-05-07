import { create } from "zustand";

// Define types for state and actions
interface ConversationState {
  selectedConversation: any; // Change 'any' to the appropriate type
  messages: any[]; // Change 'any' to the appropriate type
}

interface ConversationActions {
  setSelectedConversation: (selectedConversation: any) => void; // Change 'any' to the appropriate type
  setMessages: (messages: any[]) => void; // Change 'any[]' to the appropriate type
}

// Create the store
const useConversation = create<ConversationState & ConversationActions>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
