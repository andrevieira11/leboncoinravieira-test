import { GetServerSideProps } from 'next';
import { User } from '../../types/user';
import { createNewConversation, fetchUsers } from '../../utils/fetchAPI';
import { getLoggedUserId } from '../../utils/getLoggedUserInfo';
import { useRouter } from 'next/router';
import ErrorComponent from '../../components/ErrorComponent';

export default function NewConversation({ users }) {
    const router = useRouter();

    const handleCreateConversation = (userId: Number, userNickname: String) => {
        createNewConversation(userId, userNickname);
        router.push('/');
    }

    return !users || users?.length === 0 ? (
        <ErrorComponent text={"There was an error retrieving the users. Try again later!"} />
    ) : (
        <div className='flex w-full h-full'>
            <div className='flex flex-col w-full h-full justify-center p-2 lg:p-10 space-y-10'>
                <div className='flex w-full justify-center'>
                    <div className='flex w-full lg:w-1/2 justify-center px-4 py-2 rounded'>
                        Select a user to create a new conversation!
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <div className='flex flex-col w-full lg:w-1/4 space-y-4'>
                        {users?.map((user: User) => (
                            <button
                                key={user.id}
                                className="flex flex-row p-2 space-x-4 text-left outline outline-offset-2 outline-1 rounded-md items-center"
                                onClick={() => handleCreateConversation(user.id, user.nickname)}
                                data-testid='user-item'
                            >
                                <div className='flex w-8 h-8 rounded-full bg-blue-200 justify-center items-center'>
                                    {user.nickname[0]}
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <div className='font-bold'>{user.nickname}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    let users = await fetchUsers();
    users = users.filter((user: User) => user.id !== getLoggedUserId());

    return {
        props: {
            users,
        },
    };
};
