import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.userReducer.users);

    const fetchUsers = async () => {
        try {
            await dispatch(getUsers());
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="hidden justify-self-center md:flex">
            {users && users.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span>Registered users</span>
                    {users.map((user) => {
                        return (
                            <Link
                                to={`/userProfile/${user.email}`}
                                className="w-fit"
                                key={user.email}
                            >
                                <UserCard user={user} />
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UsersList;
