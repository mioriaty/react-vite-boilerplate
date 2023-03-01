import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: number;
  content: string;
  author: {
    email: string;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ChatState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: state => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllMessages: (
      state,
      action: PayloadAction<{
        messages: ChatMessage[];
      }>,
    ) => {
      state.messages = action.payload.messages;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        message: ChatMessage;
      }>,
    ) => {
      state.messages.push(action.payload.message);
    },
    submitMessage: (
      state,
      action: PayloadAction<{
        content: string;
      }>,
    ) => {
      return;
    },
  },
});

export const chatSliceActions = chatSlice.actions;
