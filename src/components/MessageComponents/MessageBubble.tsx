import { User } from "../../types/user";
import { getLoggedUserId } from "../../utils/getLoggedUserInfo";

export const MessageBubble = ({ message, recipientName }) => {
    const isMessageFromLoggedUser = getLoggedUserId() === message.authorId;

    return isMessageFromLoggedUser ? (
        <div className='flex flex-row w-full justify-end'>
            <div
                className='max-w-[50%] p-4 rounded-md bg-blue-300 break-words'
            >
                {message.body}
            </div>
        </div>
    ) : (
        <div className='flex w-full justify-start space-x-2'>
            <div className="flex self-end w-8 h-8 bg-red-300 rounded-full justify-center items-center">
                {recipientName[0]}
            </div>
            <div className='flex flex-col max-w-[50%]'>
                <div className='font-bold'>{recipientName}</div>
                <div
                    className='p-4 rounded-md bg-slate-200 break-words'
                >
                    {message.body}
                </div>
            </div>
        </div>
    )
};

export default MessageBubble;
