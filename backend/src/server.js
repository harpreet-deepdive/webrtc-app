import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.js";
import mongoose from 'mongoose'
import socketServer from "./socketServer.js";
import {WebSocketServer} from "ws";

dotenv.config()

const port = process.env.PORT || 6000;

process.on('uncaughtException', (err) => {
    console.log('UNHANDLED Exception! 💣 shutting down...')
    logger.error(err)
    process.exit(1)
})

const server = app.listen(port, () => {
    logger.info("server running on port " + port + " 🚀🚀");
});

const wss = new WebSocketServer({server})

wss.on('connection',socketServer)

process.on('unhandledRejection', err => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
})

process.on('SIGTERM', () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
})