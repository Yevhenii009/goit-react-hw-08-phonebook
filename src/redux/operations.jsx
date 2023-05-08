import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  '/contacts/',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (elem) {
      return thunkAPI.rejectWithValue(elem.message);
    }
  }
);

export const addContact = createAsyncThunk(
  '/contacts',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      Notify.success('Contact added successfully.');
      return response.data;
    } catch (elem) {
      return thunkAPI.rejectWithValue(elem.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      Notify.success('Contact was successfully deleted.');
      return response.data;
    } catch (elem) {
      return thunkAPI.rejectWithValue(elem.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ name, number, contactId }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, {
        name,
        number,
      });
      Notify.success('Contact was successfully changed.');
      return response.data;
    } catch (elem) {
      return thunkAPI.rejectWithValue(elem.message);
    }
  }
);