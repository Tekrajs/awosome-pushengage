import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../agent';
const initialState = {
    loading: false,
    user: {},
    errors: {},
    redirectTo: null
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            let res = await agent.Auth.login(data.username, data.password);
            return res;
        } catch (err) {
            let error = err;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.body);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            let res = await agent.Auth.register(data);
            return res;
        } catch (err) {
            let error = err;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.body);
        }

    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        updateUserState(state, action) {
            if (state.errors['email or password']) {
                delete (state.errors['email or password']);
            }
            if (state.errors[action.payload.key])
                delete (state.errors[action.payload.key]);
            state.user[action.payload.key] = action.payload.value;
        }
    },
    extraReducers: {

        [registerUser.pending]: (state) => {
            state.loading = true;
        },

        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.redirectTo = '/login';
        },

        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors;
        },

        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.redirectTo = '/';
            window.localStorage.setItem('token', action.payload.user.token);
        },

        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors;
        }
    }
});

export const { reducer, actions } = authSlice;