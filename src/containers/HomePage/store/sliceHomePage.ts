import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  message: string;
}

const initialState: State = {
  message: 'Hello',
};

export const sliceHomePage = createSlice({
  name: '@HomePage',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    removeMessage: state => {
      state.message = '';
    },
  },
});

export const { setMessage } = sliceHomePage.actions;

export const homePageSelector = (state: AppState) => state.home;
