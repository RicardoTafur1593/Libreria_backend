import express, { Application } from "express";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";
import { dbConnection } from "../database/config";
import { socketCarrito } from "../controllers/socket";
import { errorResponder } from "../middlewares/error-Responder";


import authRoutes from "../routes/auth";
import userRoutes from "../routes/usuarios";
import booksRoutes from "../routes/books";
import authorsRoutes from "../routes/authors";
import cartsRoutes from "../routes/carts";


class Servers {

    private app: Application;
    private port: string;
    private server;
    private io;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        books: '/api/books',
        authors: '/api/authors',
        carts: '/api/carts'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: '*'
            }
        })

        this.conectarDB();
        this.middlewares();
        this.socket();
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());//configuracion del cors
        this.app.use(express.json());//leer el body 
    };

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.books, booksRoutes)
        this.app.use(this.apiPaths.authors, authorsRoutes)
        this.app.use(this.apiPaths.carts, cartsRoutes)
        this.app.use(errorResponder)
    };

    socket() {
        this.io.on('connection', (socket) => { socketCarrito(socket, this.io) });
    };

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor Online en el puerto: ' + this.port);
        });
    };

}

export default Servers;