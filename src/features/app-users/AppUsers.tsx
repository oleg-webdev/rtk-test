import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersThunk, selectPage, selectUsers, setPage } from './appUsersSlice';

export const AppUsersComponent = () => {
    const users = useSelector(selectUsers);
    const page = useSelector(selectPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersThunk(1));
    }, [dispatch]);

    const fetchMore = useCallback(() => {
        dispatch(setPage(page + 1));
        dispatch(fetchUsersThunk(page));
    }, [dispatch, page]);

    return (
        <div>
            {!!users.length && users.map((user) => {
                const {cell, name: {first, last}} = user;

                return <p key={cell}>{`${first} - ${last}`}</p>;
            })}

            <button onClick={fetchMore}>fetchMore  page - {page}</button>
        </div>
    )
};