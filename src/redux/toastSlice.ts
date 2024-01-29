import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type toastState = {
  toastMessage: string;
  isError: boolean;
};

const initialState: toastState = {
  toastMessage: "",
  isError: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: {
      reducer: (
        state,
        action: PayloadAction<{ message: string; error?: boolean }>
      ) => {
        state.toastMessage = action.payload.message;
        state.isError = action.payload.error || false;
      },
      prepare: (payload: { message: string; error?: boolean }) => {
        if (payload === undefined || payload === null) {
          throw new Error("Payload must be provided");
        }
        return { payload };
      },
    },
    closeToast: (state) => {
      state.toastMessage = "";
      state.isError = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
