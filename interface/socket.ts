import { Socket } from "socket.io";
import { Usuario } from "./usuarios";

export interface SocketCustom extends Socket {
    usuarios?: Usuario
}