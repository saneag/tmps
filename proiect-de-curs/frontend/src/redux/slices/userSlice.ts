import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import axios from 'services/axios.service';

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user: any) => {}
);

const initialState = {
    status: 200,
    user: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default userSlice.reducer;
