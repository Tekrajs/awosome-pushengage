import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../agent';

const initialState = {
    appName: 'Awosome Motive',
    appLoaded: false,
    loading: false,
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
                throw err;
            }
            return rejectWithValue(error.response.body);
        }

    }
);


const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {},
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
        }
    }
});

export const { reducer, actions } = commonSlice;