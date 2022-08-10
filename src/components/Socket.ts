import { io } from "socket.io-client";

let Socket = io(import.meta.env.VITE_API_URL);

export default Socket;