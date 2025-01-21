import Link from 'next/link';
import React from 'react';

interface ErrorComponentProps {
    text: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ text }) => {
    return (
        <div className='flex flex-col w-full h-screen text-2xl justify-center items-center'>
            {text}
            <Link
                href={`/`}
                className='flex w-1/2 md:w-1/4 justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
                Home screen
            </Link>
        </div>
    );
};

export default ErrorComponent;