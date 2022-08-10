import { io } from "socket.io-client";



let Socket = io("http://localhost:4000");

export default Socket;