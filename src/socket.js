// socket.js
import { io } from "socket.io-client";
import { mainURL } from "./Config";

const socket = io(mainURL, { autoConnect: false });

export default socket;
