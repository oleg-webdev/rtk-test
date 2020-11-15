import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface CounterState {
    value: number;
    error: boolean;
}

const initialState: CounterState = {
    value: 0,
    error: false,
};

export const someCustomAsyncThunk = createAsyncThunk(
    'counter/customFetch',
    async (originalNumber: number) => {
        const response = await fetch('https://randomuser.me/api/');
        const totalReponse = await response.json();

        return await {
            originalNumber,
            sideResponse: totalReponse,
        };
    }
);


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(someCustomAsyncThunk.fulfilled, (state, action) => {
    //         console.log('action :>> ', action);
    //     })
    // },
    extraReducers: {
        // rejected
        // pending
        [someCustomAsyncThunk.fulfilled.type]: (state, action) => {
            // action.meta - args
            console.log('fulfilled: action :>> ', action);
            state.value += action.payload.originalNumber;
        },
        [someCustomAsyncThunk.rejected.type]: (state, action) => {
            // console.log('rejected: action.payload :>> ', action.payload);
        }
    }
});

export const { increment, decrement, incrementByAmount, setError } = counterSlice.actions;

export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
    setTimeout(() => dispatch(incrementByAmount(amount)), 1000);
};

const selectCounterState = (state: RootState) => state.counter;

export const selectCount = createSelector(
    selectCounterState,
    (counterState) => counterState.value,
);
export const selectError = createSelector(
    selectCounterState,
    (counterState) => counterState.error,
);

export default counterSlice.reducer;
