import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../agent';

const initialState = {
    loading: false,
    is_replying: false,
    currentComment: {},
    comments: [],
    count: 0,
    errors: {},
};

export const addComment = createAsyncThunk(
    "comment/create",
    async ({ slug, id, comment }, { rejectWithValue }) => {
        try {

            let res = await agent.Comments.create(slug, comment);
            if (res) {
                return await agent.Comments.get(id);
            }

        } catch (err) {
            let error = err;
            if (!error.response) {
                return rejectWithValue({ errors: { [err.name]: err.message } });
            }
            return rejectWithValue(error.response.body);
        }
    }
);

export const retrieveComments = createAsyncThunk(
    "comment/retrieve",
    async (slug, { rejectWithValue }) => {
        try {
            let res = await agent.Comments.get(slug);
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

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },

        updateState(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        updateCommentState(state, action) {

            if (state.errors[action.payload.key])
                delete (state.errors[action.payload.key]);

            state.currentComment[action.payload.key] = action.payload.value;
        },
        updateErrorState(state, action) {
            state.errors[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: {

        [retrieveComments.fulfilled]: (state, action) => {
            let comments = [];
            for (let comment of Object.values(action.payload.comments)) {
                comments.push(comment);
            }
            state.count = action.payload.count;
            state.comments = comments.sort((a, b) => { return new Date(b.publishDate) - new Date(a.publishDate); });
        },

        [addComment.pending]: (state, action) => {
            state.is_replying = true;
        },

        [addComment.fulfilled]: (state, action) => {
            let comments = [];
            for (let comment of Object.values(action.payload.comments)) {
                comments.push(comment);
            }
            state.is_replying = false;
            state.count = action.payload.count;
            state.comments = comments.sort((a, b) => { return new Date(b.publishDate) - new Date(a.publishDate); });
            state.currentComment = {};
        },

        [addComment.rejected]: (state, action) => {
            state.is_replying = false;
            state.errors = action.payload.errors;
        }

    }
});

export const { reducer, actions } = commentSlice;