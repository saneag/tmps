import React from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getUserByEmail } from 'redux/slices/userSlice';

const UserProfileAsGuest = () => {
    const dispatch = useAppDispatch();
    const { email } = useParams();

    const visitedUser = useAppSelector(
        (state) => state.userReducer.visitedUser
    );

    React.useEffect(() => {
        if (email) {
            dispatch(getUserByEmail(email));
        }
    }, [dispatch, email]);

    return <div>{visitedUser.firstName}</div>;
};

export default UserProfileAsGuest;
