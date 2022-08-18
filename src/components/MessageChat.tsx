import { useEffect, useState } from "react";

interface Message {
    id: number;
    name: string;
    message: string;
}

interface MessageChatProps {
    message: Message;
    name: string;
}

const MessageChat = ({ message, name }: MessageChatProps) => {
    const [itsMe, setItsMe] = useState(false);
    useEffect(() => {
        if (message.name === name) {
            return setItsMe(true);
        }
        setItsMe(false);
    }, [message, name]);

       
    return (
        <div
            className={`${!itsMe ? "flex justify-start" : "justify-end"} flex `}
        >
            <div
                className={`${
                    itsMe
                        ? "bg-indigo-100"
                        : "bg-green-100"
                } py-1 lg:py-2 px-4  shadow rounded-xl max-w-fit`}
            >
                <span className="text-gray-700 ">
                    {!itsMe && `${message.name} - `}
                </span>
                <span className="text-gray-700">{message.message}</span>
            </div>
        </div>
    );
};

export default MessageChat;
