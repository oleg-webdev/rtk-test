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
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    error: false,
    page: 1,
    isLoading: true,
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
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
            state.users = [
                ...state.users,
                ...action.payload.users,
            ];

            state.isLoading = false;
        })
    },
});

export const { setPage, setLoading } = usersSlice.actions;

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
    selectUsersState,
    (usersState) => usersState.users,
);
export const selectPage = createSelector(
    selectUsersState,
    (usersState) => usersState.page,
);

export const selectIsLoading = createSelector(
    selectUsersState,
    (usersState) => usersState.isLoading,
);

export default usersSlice.reducer;
