import React from 'react';
import { IUserResponse } from '../../../shared/interfaces/IUser';
import { Components } from '../../index';

interface IUserCard {
    user: IUserResponse;
}

const UserCard = ({ user }: IUserCard) => {
    return (
        <div className="p-2">
            <div className="flex items-center gap-2">
                <Components.ImageRenderer
                    imageUrl={user.avatarUrl}
                    type={'userAvatar'}
                    alt={'userAvatar'}
                    className={'h-10 w-10 rounded-full text-4xl'}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                        {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
