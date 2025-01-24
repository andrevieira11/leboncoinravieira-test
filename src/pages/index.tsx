import { GetServerSideProps } from 'next';
import { ConversationList } from '../components/ConversationList';
import { fetchConversations, fetchUsers } from '../utils/fetchAPI';
import Link from 'next/link';
import { memo } from 'react';
import { Conversation } from '../types/conversation';
import { getLoggedUserId } from '../utils/getLoggedUserInfo';

export default function Home({ conversations }) {
  const MemoizedConversationListComponent = memo(({ conversations }: { conversations: Conversation[] }) => {
    return <ConversationList
      conversations={conversations}
    />;
  });

  return (
    <div className='flex flex-col w-full h-full justify-center p-2 md:p-10 space-y-10'>
      {/* New conversation button */}
      <div className='flex w-full justify-center'>
        <Link
          href={`/conversation/newconversation`}
          className='flex w-full lg:w-1/4 justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          tabIndex={0}
        >
          Create new conversation
        </Link>
      </div>
      {/* Conversations list */}
      <div
        className='flex w-full justify-center'
      >
        {conversations?.length === 0 ? (
          <div className='flex w-full lg:w-1/2 justify-center px-4 py-2 rounded'>
            No conversations yet!
          </div>
        ) : (
          <MemoizedConversationListComponent conversations={conversations} />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const conversations = await fetchConversations();
  const conversationWithoutSelf = conversations.filter((conversation: Conversation) => conversation.id !== getLoggedUserId());

  return { props: { conversations: conversationWithoutSelf } };
};
