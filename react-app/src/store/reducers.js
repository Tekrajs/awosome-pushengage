import { combineReducers } from '@reduxjs/toolkit';
import { reducer as blogReducer } from './blog/slice';
import { reducer as commonReducer } from './common/slice';
import { reducer as authReducer } from './auth/slice';
import { reducer as commentReducer } from './comment/slice';

const rootReducer = combineReducers({
    blogReducer,
    commonReducer,
    authReducer,
    commentReducer
});

export default rootReducer;