import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  message: string;
}

const initialState: State = {
  message: 'Sorry, an unexpected error has occurred.',
};

export const sliceError = createSlice({
  name: '@Error',
  initialState,
  reducers: {
    setMessageError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessageError } = sliceError.actions;
