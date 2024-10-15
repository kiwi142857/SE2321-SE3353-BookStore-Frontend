import { websocketUrl } from "./common";

export const createWebSocketConnection = function (id) {
    return new Promise(function (resolve, reject) {
        // Create a new WebSocket connection
        const socket = new WebSocket(websocketUrl);

        // Send a message when the connection is open
        // TODO: 测试用，后续删除
        socket.onopen = function () {
            const message = JSON.stringify({
                test: "test",
            });
            console.log("WebSocketConnection onopen: ", message);
            socket.send(message);

            // Resolve the promise with the socket
            resolve(socket);
        };

        // Reject the promise if there is an error
        socket.onerror = function (error) {
            reject(error);
        };
    });
};

export const sendMessage = function (socket, message) {

    if (socket) {
        const sendContent = JSON.stringify({
            content: message,
        });
        console.log("sendMessage: ", message);
        socket.send(sendContent);
    }
};