import { Conversation } from "../types/conversation";

export const getRecipientName = (conversation: Conversation) => {
    if (!conversation || !conversation?.recipientId) return '';
    return conversation.recipientId === 1 ? conversation.senderNickname : conversation.recipientNickname;
};