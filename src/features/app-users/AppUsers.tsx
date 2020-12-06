import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsersThunk,
    selectIsLoading,
    selectPage,
    selectUsers,
    setLoading,
    setPage,
} from './appUsersSlice';

export const AppUsersComponent = () => {
    const users = useSelector(selectUsers);
    const page = useSelector(selectPage);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersThunk(1));
    }, [dispatch]);

    const fetchMore = useCallback(() => {
        dispatch(setLoading(true));
        dispatch(setPage(page + 1));
        dispatch(fetchUsersThunk(page));
    }, [dispatch, page]);

    return (
        <div>
            {!!users.length &&
                users.map((user) => {
                    const {
                        cell,
                        name: { first, last },
                    } = user;

                    return <p key={cell}>{`${first} - ${last}`}</p>;
                })}

            <p><strong>{isLoading && 'Loading...'}</strong></p>
            <button onClick={fetchMore}>fetchMore page - {page}</button>
        </div>
    );
};
