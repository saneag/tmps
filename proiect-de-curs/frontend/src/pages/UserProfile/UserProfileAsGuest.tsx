import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { Components } from 'components';
import { useParams } from 'react-router';
import { getUserByEmail } from '../../redux/slices/userSlice';

const UserProfileAsGuest = () => {
    const dispatch = useAppDispatch();
    const { email } = useParams();

    React.useEffect(() => {
        dispatch(getUserByEmail(email as string));
    }, [email]);

    const user = useAppSelector((state) => state.userReducer.visitedUser);

    return (
        <div
            className="my-4 grid grid-cols-1 justify-items-center gap-y-6
            px-4 md:grid-cols-3 md:gap-3 md:px-0"
        >
            <div
                className="flex w-full flex-col gap-3 self-start md:sticky md:top-20
                md:w-8/12"
            >
                <Components.ImageRenderer
                    imageUrl={user.avatarUrl}
                    type={'userAvatar'}
                    alt={'userAvatar'}
                    className={'mx-auto h-32 w-32 rounded-full text-9xl'}
                />
                <div
                    className="flex flex-col rounded-xl bg-gray-400 px-4
                    py-3"
                >
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Firstname </span>
                        <span className="text-xl">{user.firstName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Lastname</span>
                        <span className="text-xl">{user.lastName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Email</span>
                        <span className="text-xl">{user.email}</span>
                    </div>
                    <span className="text-2xl font-bold">Description</span>
                    <span className="text-xl">
                        {user.description !== ''
                            ? user.description
                            : 'No description yet.'}
                    </span>
                </div>
            </div>
            <div className="col-span-2 w-full">
                <Components.PostList />
            </div>
        </div>
    );
};

export default UserProfileAsGuest;
