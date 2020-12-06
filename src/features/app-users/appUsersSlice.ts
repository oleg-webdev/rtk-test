import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface User {
    cell: string;
    name: {
        first: string;
        last: string;
    }
}

interface UsersState {
    users: User[];
    error: boolean;
    page: number;
}

const initialState: UsersState = {
    users: [],
    error: false,
    page: 1,
};

export const fetchUsersThunk = createAsyncThunk(
    'users/fetchUsers',
    async (page: number) => {
        const response = await fetch(`https://randomuser.me/api/?page=${page}&results=5`);
        const totalReponse = await response.json();

        return await {
            page,
            users: totalReponse.results,
        };
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
            state.users = [
                ...state.users,
                ...action.payload.users,
            ];
        })
    },
});

export const { setPage } = usersSlice.actions;

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
    selectUsersState,
    (usersState) => usersState.users,
);
export const selectPage = createSelector(
    selectUsersState,
    (usersState) => usersState.page,
);

export default usersSlice.reducer;
