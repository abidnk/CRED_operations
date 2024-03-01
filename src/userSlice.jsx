import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://reqres.in/api/users');
    return response.data.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    const response = await axios.post('https://reqres.in/api/users', user);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    return id;
});

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
    const response = await axios.put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser);
    return response.data;
});

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                state.users[index] = action.payload;
            });
    },
});

export default usersSlice.reducer;
