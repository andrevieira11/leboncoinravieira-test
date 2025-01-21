import { Conversation } from '../types/conversation';
import Link from 'next/link';

export const ConversationList = ({ conversations }: { conversations: Conversation[] }) => {
    return (
        <div className="flex flex-col w-full lg:w-1/4 space-y-4">
            {conversations?.map((conversation) => (
                <Link
                    href={`/conversation/${conversation.id}`}
                    key={conversation.id}
                    className="flex flex-row p-2 space-x-4 text-left outline outline-offset-2 outline-1 rounded-md items-center"
                    data-testid='conversation-item'
                    tabIndex={0}
                    aria-label={`Go to conversation with ${conversation.recipientNickname}`}
                >
                    {/* Recipient profile picture */}
                    <div className='flex w-8 h-8 rounded-full bg-blue-200 justify-center items-center'>
                        {conversation.recipientNickname[0]}
                    </div>
                    {/* Recipient name and last message date */}
                    <div className='flex flex-col space-y-2'>
                        <div className='font-bold'>{conversation.recipientNickname}</div>
                        <p className='text-slate-400'>{new Date(conversation.lastMessageTimestamp * 1000).toLocaleDateString('en-GB')}</p>
                    </div>

                </Link>
            ))}
        </div>
    );
};
