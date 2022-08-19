import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user.js';


export const store = configureStore({
    reducer: {
       user : userReducer,
    },
})