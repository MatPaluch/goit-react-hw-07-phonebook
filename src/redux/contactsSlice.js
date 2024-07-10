import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { addContact, deleteContact, fetchContactsThunk } from "./operations";

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
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.err = null;
        state.allContact = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allContact.push(action.payload);
        state.err = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allContact.splice(action.payload, 1);
        state.err = null;
      })
      // here are scaling pending and rejected action ↓
      // .addMatcher((action)=>HAS to return similar action type,(state,action)=>{reducer operations with store,state 'PURE mutate functions'})
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.err = action.payload;
        },
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
