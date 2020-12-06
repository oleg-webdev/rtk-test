import {
    Action,
    Middleware,
    ThunkAction,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/app-users/appUsersSlice';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    // console.log('dispatching', action);
    const result = next(action);
    // console.log('next state', storeAPI.getState());

    return result;
};

const reducer = {
    counter: counterReducer,
    users: usersReducer,
};
const middleware = [...getDefaultMiddleware(), loggerMiddleware];

export const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
