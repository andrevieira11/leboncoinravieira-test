import { Conversation } from "../types/conversation";

export const getRecipientName = (conversation: Conversation) => {
    return conversation.recipientId === 1 ? conversation.senderNickname : conversation.recipientNickname;
};