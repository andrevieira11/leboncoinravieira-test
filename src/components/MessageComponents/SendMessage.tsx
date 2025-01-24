import { useState } from 'react';
import { Message } from '../../types/message';
import { sendNewMessage } from '../../utils/fetchAPI';

interface SendMessageProps {
    conversationId: number;
    addMessage: (message: Message) => void;
}

export default function SendMessage({ conversationId, addMessage }: SendMessageProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await sendNewMessage(conversationId, newMessage);

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const createdMessage: Message = await response.json();

            // Pass the new message to the parent component
            addMessage(createdMessage);
            setNewMessage('');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='flex py-2 md:py-10 w-full'>
            <input
                type='text'
                className='flex rounded p-2 w-full'
                placeholder='Type a message...'
                value={newMessage}
                onChange={handleNewMessageChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                tabIndex={1}
            />
            <button
                className={`md:ml-4 px-2 md:px-6 py-2 rounded ${newMessage.trim() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 hover:cursor-not-allowed'}`}
                onClick={handleSendMessage}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                tabIndex={0}
                disabled={!newMessage.trim()}
            >
                Send
            </button>
        </div>
    );
}
