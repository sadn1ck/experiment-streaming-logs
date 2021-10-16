import { WebSocketServer } from "ws";
import { logger } from "./lib/logger.js";
import { tail } from "./lib/tail.js";

const WS_PORT = 8001;

const wss = new WebSocketServer({ port: WS_PORT }, () => {
  logger(`WSS Server running on port ${WS_PORT}`);
});

const wssHandler = (socket) => {
  console.log("New connection");

  socket.on("message", (msg) => {
    const jsonMsg = JSON.parse(msg.toString());
    logger(jsonMsg, "ws");
    // if start
    if (jsonMsg.msg === "start") {
      tail(socket, {
        command: "tail",
        args: ["-f", "scripts/stream-this.log"],
      });
    }
    // start tail on scripts/stream-this.log
  });

  socket.on("close", () => {
    logger(`client disconnected`);
  });
};

wss.on("connection", wssHandler);
