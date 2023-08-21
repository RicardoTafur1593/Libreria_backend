import dotenv from "dotenv";
import Servers from './models/server';

//configurar dotenv
dotenv.config();

const server = new Servers();
server.listen();