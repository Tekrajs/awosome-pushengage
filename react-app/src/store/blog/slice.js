import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../agent';

const initialState = {
    loading: false,
    creating: false,
    show_model: false,
    blog: {},
    blogs: [],
    errors: {}
};

export const retrieveBlog = createAsyncThunk(
    "blog/retrieve",
    async (id, { rejectWithValue }) => {
        try {
            const res = await agent.Blog.get(id);
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

export const createBlog = createAsyncThunk(
    "blog/create",
    async ({ title, content, date }, { rejectWithValue }) => {
        try {
            const res = await agent.Blog.create({ blog: { title, content, date } });
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

export const retrieveBlogs = createAsyncThunk(
    "blog/retrieves",
    async (_, { rejectWithValue }) => {
        try {
            let res = await agent.Blog.getAll();
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

export const retrieveComments = createAsyncThunk(
    "blog/comments",
    async (slug, { rejectWithValue }) => {
        try {
            let res = await agent.Comments.get(slug);
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

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },

        updateState(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        updateBlogState(state, action) {
            if (action.payload.key === 'title' && state.errors['slug']) {
                delete (state.errors['slug']);
            }
            if (state.errors[action.payload.key])
                delete (state.errors[action.payload.key]);
            state.blog[action.payload.key] = action.payload.value;
        },
        updateErrorState(state, action) {
            state.errors[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: {

        [createBlog.pending]: (state) => {
            state.creating = true;
        },

        [createBlog.fulfilled]: (state, action) => {
            state.creating = false;
            state.blog = action.payload.blog;
            state.blogs.push(action.payload.blog);
            state.show_model = !state.show_model;
        },

        [createBlog.rejected]: (state, action) => {
            state.creating = false;
            state.errors = action.payload.errors;
        },

        [retrieveBlog.pending]: (state) => {
            state.loading = true;
            state.blog = {};
        },

        [retrieveBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        },

        [retrieveBlogs.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.count = action.payload.count;
        },

        [retrieveBlogs.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload.errors;
        }

    }
});

export const { reducer, actions } = blogSlice;