import { useState, useEffect, useRef } from "react";
import MessageChat from "./MessageChat";
import socket from "./Socket";

interface ChatProps {
    name: string;
}

const Chat = ({ name }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<String[]>([]);

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
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
        sendMessage();
            return;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendMessage();
    };

    return (
        <div className="flex flex-col space-y-8 lg:w-1/3 ">
            <h1 className="text-3xl font-bold text-center text-indigo-600">Chat App</h1>
            <div className="overflow-hidden rounded-xl shadow ">
                <div className="bg-gray-50 w-full min-h-[50vh] max-h-52  overflow-y-auto p-4 lg:p-6 space-y-2 focus:outline-none focus:border-0">
                    {messages.map((message: any, index) => (
                        <MessageChat
                            name={name}
                            message={message}
                            key={index}
                        />
                    ))}
                    <div ref={divRef}></div>
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
