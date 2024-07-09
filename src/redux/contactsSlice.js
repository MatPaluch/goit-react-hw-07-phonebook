import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { fetchContactsThunk } from "./operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    allContact: [],
    isLoading: false,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;
        state.allContact = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
