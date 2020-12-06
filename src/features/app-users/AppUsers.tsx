import React, { useCallback, useEffect, useRef, useState } from 'react';

const fetchUsers = async (page: number) => {
    const fetchedData = await fetch(`https://randomuser.me/api/?page=${page}&results=5`);

    return await fetchedData.json();
};

interface User {
    cell: string;
    name: {
        first: string;
        last: string;
    }
}

export const AppUsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const fetchMoreAction = useRef(() => {});

    fetchMoreAction.current = () => {
        fetchUsers(page).then((response) => {
            const { results } = response;

            setUsers([
                ...users,
                ...results,
            ]);
        });
    };

    useEffect(() => {
        fetchMoreAction.current();
    }, []);

    const fetchMore = useCallback(() => {
        setPage(page + 1);
        fetchMoreAction.current();
    }, [page]);

    return (
        <div>
            {!!users.length && users.map((user) => {
                const {cell, name: {first, last}} = user;

                return <p key={cell}>{`${first} - ${last}`}</p>;
            })}

            <button onClick={fetchMore}>fetchMore</button>
        </div>
    )
};