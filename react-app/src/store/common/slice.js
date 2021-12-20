import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../agent';

const initialState = {
    appName: 'Awosome App',
    appLoaded: false,
    loading: false,
    subscription: {},
    errors: {}
};


export const onAppLoad = createAsyncThunk(
    "common/onAppLoad",
    async ({ token }, { rejectWithValue }) => {

        try {
            if (!token) {
                return {
                    data: { user: null }
                };
            }
            let res = await agent.Auth.current();
            return res;
        } catch (err) {
            let error = err;
            if (!error.response) {
                return rejectWithValue({ errors: { [err.name]: err.message } });
            }
            return rejectWithValue(error.response.body);
        }

    }
);

export const onSubscribe = createAsyncThunk(
    "common/onSubscribe",
    async ({ email }, { rejectWithValue }) => {

        try {
            let res = await agent.Subscription.create(email);
            return res;

        } catch (err) {
            let error = err;
            if (!error.response) {
                return rejectWithValue({ errors: { [err.name]: err.message } });
            }
            return rejectWithValue(error.response.body);
        }
    }
);


const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {

        updateSubscriptionState(state, action) {

            if (state.errors[action.payload.key])
                delete (state.errors[action.payload.key]);

            state.subscription[action.payload.key] = action.payload.value;
        },

        updateErrorState(state, action) {
            state.errors[action.payload.key] = action.payload.value;
        }

    },
    extraReducers: {
        [onAppLoad.pending]: (state) => {
            state.loading = true;
        },

        [onAppLoad.fulfilled]: (state, action) => {
            state.loading = false;
            state.appLoaded = true;
            state.token = action.token;
            state.currentUser = action.payload.user;

        },

        [onAppLoad.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors;
            if (state.errors.code === 'invalid_token') {
                window.localStorage.removeItem('token');
                state.currentUser = null;
            }
        },

        [onSubscribe.fulfilled]: (state, action) => {
            state.subscription.message = action.payload.message;
        },

        [onSubscribe.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors;
        },
    }
});

export const { reducer, actions } = commonSlice;