import { useState } from "react";
import Chat from "./components/Chat";
import FormUser from "./components/FormUser";


import Socket from "./components/Socket";

const App = () => {
    const [name, setName] = useState("");
    const [registred, setRegistred] = useState(false);
    Socket.emit("connected", "hola desde cliente");

    return (
        <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center ">
            {!registred && (
                <FormUser
                    name={name}
                    setName={setName}
                    setRegistred={setRegistred}
                />
            )}
            {registred && <Chat name={name} />}
        </div>
    );
};

export default App;
