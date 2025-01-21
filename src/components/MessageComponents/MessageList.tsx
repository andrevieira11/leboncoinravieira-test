import useSWR from 'swr';
import { fetchMessage } from '../../utils/fetchAPI';
import MessageBubble from './MessageBubble';
import { Message } from '../../types/message';

export const MessageList = ({ conversationId }) => {
    const { data: messages, error } = useSWR(
        conversationId ? `/messages/${conversationId}` : null,
        () => fetchMessage(conversationId)
    );

    console.log('messages ', messages);

    if (error) return <div>Error loading messages.</div>;
    if (!messages) return <div>Loading messages...</div>;

    return (
        <div className='flex'>
            <h1>Messages for Conversation {conversationId}</h1>
            <ul className='flex'>
                {messages.map((message: Message) => (
                    <li
                        key={message.id}
                        className='flex w-1/2'
                    >
                        <div className='flex w-8 h-8 rounded-full bg-blue-200 justify-center items-center'>
                            {message.authorNickname[0]}
                        </div>
                        <MessageBubble message={message} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
