import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://668d4cdf099db4c579f27dc6.mockapi.io";

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/phonebook/contacts");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (oneContact, thunkAPI) => {
    try {
      const response = await axios.post("/phonebook/contacts", oneContact);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  (id, thunkAPI) => {
    try {
      const response = axios.delete(`/phonebook/contacts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
