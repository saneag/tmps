import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useNavigate } from 'react-router';
import { IUserResponse } from '../../../shared/interfaces/IUser';
import { logout } from '../../../redux/slices/userSlice';
import { Components } from '../../index';

interface Links {
    name: string;
    path: string;
    icon?: string;
}

interface ILinks {
    dropdownLinks: Links[];
}

const UserDropdown = ({ dropdownLinks }: ILinks) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user: IUserResponse = useAppSelector(
        (state) => state.userReducer.user
    );
    const [isUserInfoOpen, setIsUserInfoOpen] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const dropdownButtonRef = React.useRef<HTMLButtonElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div onMouseLeave={() => setIsUserInfoOpen(false)}>
            <button
                className="flex items-center gap-1 text-white"
                onMouseEnter={() => setIsUserInfoOpen(true)}
                ref={dropdownButtonRef}
            >
                <div className="h-9 w-9 rounded-full">
                    <Components.ImageRenderer
                        imageUrl={user.avatarUrl}
                        type={'userAvatar'}
                        alt={''}
                        className={
                            'h-full w-full rounded-full object-cover text-3xl'
                        }
                    />
                </div>
                <span className="ml-1">{user.firstName}</span>
                <span
                    className="material-symbols-outlined relative top-0.5
                                            text-sm text-white"
                >
                    expand_more
                </span>
            </button>
            {isUserInfoOpen && (
                <div
                    className="absolute top-[42px] z-10 w-44 divide-y
                                divide-gray-100 rounded-lg bg-white shadow
                                dark:divide-gray-600 dark:bg-gray-700 max-[768px]:right-0"
                    ref={dropdownRef}
                >
                    <div className="flex flex-col px-4 py-3 text-white">
                        <span className="truncate">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="truncate">{user.email}</span>
                    </div>
                    <ul
                        className="select-none px-4 py-3 text-white"
                        onClick={() => setIsUserInfoOpen(false)}
                    >
                        {dropdownLinks.map((link: Links) => {
                            return (
                                <li key={link.path}>
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="block capitalize"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div
                        className="select-none px-4 py-3 text-white"
                        role="button"
                        onClick={handleLogout}
                    >
                        <span>Sign out</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
