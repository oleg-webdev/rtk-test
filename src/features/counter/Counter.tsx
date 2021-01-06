import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount,
    selectError,
    someCustomAsyncThunk,
    customAsyncThunk2,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
    const count = useSelector(selectCount);
    const asyncError = useSelector(selectError);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
    const totalIncrement = Number(incrementAmount) || 0;

    return (
        <div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button className={styles.button} onClick={() => dispatch(incrementByAmount(totalIncrement))}>
                    Add Amount
                </button>
                <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(totalIncrement))}>
                    Add Async
                </button>
                <button className={styles.asyncButton} onClick={() => dispatch(someCustomAsyncThunk(totalIncrement))}>
                    Add Async With call
                </button>
                <button className={styles.asyncButton} onClick={() => dispatch(customAsyncThunk2(totalIncrement))}>
                    Add Async With call customAsyncThunk2
                </button>
            </div>
            {asyncError && 'Async Encrement fails!'}
        </div>
    );
}
