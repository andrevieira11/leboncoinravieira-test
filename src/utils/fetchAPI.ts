import { getLoggedUserId, getLoggedUserNickname } from "./getLoggedUserInfo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const checkAndReturnResponse = async (response: Response) => {
    const text = await response.text();
    if (!text) {
        return null;
    }

    const data = JSON.parse(text);

    if (!data || Object.keys(data).length === 0) {
        return null;
    }
    return data;
}

export const sendNewMessage = async (conversationId: Number, newMessage: String) => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            conversationId: Number(conversationId),
            timestamp: Math.floor(Date.now() / 1000),
            authorId: getLoggedUserId(),
            body: newMessage.trim(),
        }),
    });
    return response;
}

export const createNewConversation = async (recipientId: Number, recipientNickname: String) => {
    const response = await fetch(`${API_BASE_URL}/conversations?senderId=${getLoggedUserId()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipientId: recipientId,
            recipientNickname: recipientNickname,
            lastMessageTimestamp: Math.floor(Date.now() / 1000),
            senderId: Number(getLoggedUserId()),
            senderNickname: getLoggedUserNickname(),
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
};

export const fetchConversations = async () => {
    const response = await fetch(`${API_BASE_URL}/conversations?senderId=${getLoggedUserId()}`);
    return await checkAndReturnResponse(response);
};

export const fetchConversationDetails = async (id: Number) => {
    const response = await fetch(`${API_BASE_URL}/conversations?id=${id}&senderId=${getLoggedUserId()}`);
    return await checkAndReturnResponse(response);
};

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return await checkAndReturnResponse(response);
};

export const fetchMessage = async (id: Number) => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`);
    return await checkAndReturnResponse(response);
};