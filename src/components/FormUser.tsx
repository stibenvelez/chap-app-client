import React from "react";

interface FormUserProps {
    name: string;
    setName: (name: string) => void;
    setRegistred: (registred: boolean) => void;
}

const FormUser = ({ name, setName, setRegistred }: FormUserProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name !== "") {
            setRegistred(true);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">Ingrese su nombre de usuario</h1>
            <div className="bg-gray-50 p-4 lg:p-8 rounded-lg shadow">
                <form onSubmit={handleRegister}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="">Nombre de usuario</label>
                            <input
                                className="p-2 bg-gray-100 outline outline-1 outline-gray-200 rounded-lg"
                                type="text"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="rounded py-2 px-4 bg-indigo-600 text-white ">
                            ir al chat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormUser;
