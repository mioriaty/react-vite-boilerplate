import { ChatMessage, chatSliceActions } from '@app/containers/SocketConntector';
import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

import { ChatEvent } from './chatEvent';

export const socketMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnected = socket && (store.getState() as AppState).socketConnector.chat.isConnected;

    if (chatSliceActions.startConnecting.match(action)) {
      socket = io(import.meta.env.REACT_APP_API_URL, {
        withCredentials: true,
      });

      // emit ChatEvent.RequestAllMessages ngay khi socket được kết nối
      socket.on('connect', () => {
        store.dispatch(chatSliceActions.connectionEstablished());

        socket.emit(ChatEvent.RequestAllMessages);
      });

      // Listen to the ChatEvent.SendAllMessages event that the backend emits in response to the ChatEvent.RequestAllMessages event
      socket.on(ChatEvent.SendAllMessages, (messages: ChatMessage[]) => {
        store.dispatch(chatSliceActions.receiveAllMessages({ messages }));
      });

      // Listen to the ChatEvent.ReceiveMessage event the backend emits when any of the users send a message.
      socket.on(ChatEvent.ReceiveMessage, (message: ChatMessage) => {
        store.dispatch(chatSliceActions.receiveMessage({ message }));
      });
    }

    // Emit the ChatEvent.SendMessage event when the user dispatches the chatActions.submitMessage action.
    if (chatSliceActions.submitMessage.match(action) && isConnected) {
      socket.emit(ChatEvent.SendMessage);
    }

    next(action);
  };
};
