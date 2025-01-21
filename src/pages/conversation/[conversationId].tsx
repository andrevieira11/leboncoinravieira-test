import { GetServerSideProps } from 'next';
import { fetchConversationDetails, fetchMessage, fetchUsers } from '../../utils/fetchAPI';
import MessageBubble from '../../components/MessageComponents/MessageBubble';
import { Message } from '../../types/message';
import { getDayWithTime } from '../../utils/timeUtils';
import SendMessage from '../../components/MessageComponents/SendMessage';
import { useState } from 'react';

import { useEffect, useRef } from 'react';
import ErrorComponent from '../../components/ErrorComponent';

export default function ConversationPage({ conversationId, conversationDetails, initialMessages, users }) {
    const [messages, setMessages] = useState(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (newMessage: Message) => {
        setMessages((prev: Message[]) => [...prev, newMessage]);
    };

    return !!conversationDetails && conversationDetails?.id ? (
        <div className='flex flex-col w-full h-screen overflow-hidden'>
            {/* Header */}
            <div className='flex flex-row h-20 px-2 md:px-10 bg-slate-200 items-center sticky top-0 z-10 flex-none'>
                <div className='text-sm md:text-xl font-bold'>{conversationDetails.senderNickname} - You</div>
                <div className='flex-grow'></div>
                <div className='text-xs md:text-xl font-bold'>
                    Last message: {getDayWithTime(conversationDetails.lastMessageTimestamp)}
                </div>
            </div>

            {/* Body - message list */}
            <div className='flex-grow overflow-y-auto p-6'>
                <ul className='flex flex-col w-full gap-2'>
                    {messages.map((message: Message) => (
                        <li
                            key={message.id}
                            className='flex w-full'
                        >
                            <MessageBubble message={message} users={users} />
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>

            {/* Footer - send */}
            <div className='flex flex-row h-20 px-2 md:px-10 bg-slate-200 justify-center items-center sticky bottom-0 z-10 flex-none'>
                <SendMessage conversationId={conversationId} addMessage={addMessage} />
            </div>
        </div>
    ) : (
        <ErrorComponent text='There was an error retrieving the conversation. Try again later!' />
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { conversationId } = context.params;

    if (!conversationId) {
        return {
            notFound: true,
        };
    }

    const conversationDetails = await fetchConversationDetails(Number(conversationId));
    const initialMessages = await fetchMessage(Number(conversationId));
    const users = await fetchUsers();

    return {
        props: {
            conversationId,
            conversationDetails,
            initialMessages,
            users,
        },
    };
};
