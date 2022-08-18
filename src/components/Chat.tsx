import { useState, useEffect, useRef } from "react";
import DotTyping from "./DotTyping";
import MessageChat from "./MessageChat";
import Notification from "./Notification";
import socket from "./Socket";

interface ChatProps {
    name: string;
}
interface Message {
    id: number | string;
    name: string;
    message: string;
}

const WritingEmpty = {
    id: "",
    name: "",
    message: "",
};

const Chat = ({ name }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<String[]>([]);
    const [writing, setWriting] = useState<Partial<Message>>(WritingEmpty);

    useEffect(() => {
        socket.emit("conected", name);
        
    }, []);

    useEffect(() => {
        socket.on("messages", (message: any) => {
            setMessages([...messages, message]);
        });

        return () => {
            socket.off();
        };
    }, [messages]);

    useEffect(() => {
        socket.on("writing", (notification) => {
            setWriting(notification);
            setTimeout(() => {
                setWriting(WritingEmpty);
            }, 2000);
        });

        return () => {
            socket.off();
        };
    }, [messages]);

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("message", name, message);
            setMessage("");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        socket.emit("writing", name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage();
            return;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendMessage();
    };

    return (
        <div className="flex flex-col space-y-8 p-2 w-full lg:w-1/3 md:w-1/2 ">
            <h1 className="text-3xl font-bold text-center text-indigo-600">
                Chat App
            </h1>
            <div className="space-y-1">
                <div className="overflow-hidden rounded-xl bg-white flex flex-col max-h-52 shadow min-h-[50vh]   ">
                    <div className=" w-full   overflow-y-auto p-2 lg:p-6   space-y-2 focus:outline-none focus:border-0 ">
                        <>
                            {messages.map((message: any, index) => {
                                if (message.type === "message") {
                                    return (
                                        <MessageChat
                                            name={name}
                                            message={message}
                                            key={index}
                                        />
                                    );
                                }
                                if (message.type === "notification") {
                                    return (
                                        <Notification
                                            name={name}
                                            message={message}
                                            key={index}
                                        />
                                    );
                                }
                            })}

                            <div ref={divRef}></div>
                        </>
                    </div>
                </div>
                <div
                    className={`px-4 bottom-0 w-full min-h-[2rem] flex gap-6 items-center`}
                >
                    {writing.message !== "" ? (
                        <>
                            <span className="text-gray-500">
                                {writing.message}
                            </span>

                            <DotTyping />
                        </>
                    ) : null}
                </div>
            </div>
            <div className="space-y-4">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700">Mensaje:</label>
                            <textarea
                                className="focus:outline-none focus:border-0 p-4 overflow-hidden rounded-lg shadow"
                                name="message"
                                id="message"
                                cols={30}
                                rows={8}
                                value={message}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 py-2 px-4 text-white rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
