import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type modalsState = {
  activeModal: string;
};

const initialState: modalsState = {
  activeModal: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    openModal: {
      reducer: (state, action: PayloadAction<string, string>) => {
        state.activeModal = action.payload;
      },
      prepare: (payload: string) => {
        if (payload === undefined || payload === null) {
          throw new Error("Payload must be provided");
        }
        return { payload };
      },
    },
    closeModal: (state) => {
      state.activeModal = "";
    },
  },
});

export const { openModal, closeModal } = testSlice.actions;

export default testSlice.reducer;
