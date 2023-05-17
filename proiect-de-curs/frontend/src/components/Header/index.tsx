import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

import links from 'assets/headerLinks.json';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/slices/userSlice';
import { IUserResponse } from '../../shared/interfaces/IUser';

interface Links {
    name: string;
    path: string;
}

const Header = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const user: IUserResponse = useAppSelector((state) => state.auth.user);
    const [isUserInfoOpen, setIsUserInfoOpen] = React.useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const dropdownButtonRef = React.useRef<HTMLButtonElement>(null);

    const publicLinks = React.useMemo(() => links[0].publicLinks || [], []);

    const [activeTab, setActiveTab] = React.useState<string>();

    React.useEffect(() => {
        if (publicLinks.some((link) => link.path === location.pathname)) {
            setActiveTab(location.pathname);
        } else {
            setActiveTab('');
        }
    }, [location.pathname, publicLinks]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <div className="h-16 bg-blue-800">
                <div className="flex h-full flex-wrap content-center justify-center">
                    <div className="w-1/3"></div>
                    <div className="flex w-1/3 justify-center gap-5">
                        {publicLinks.map((link: Links) => {
                            return (
                                <div
                                    key={link.path}
                                    onClick={() => setActiveTab(link.path)}
                                    className="flex h-full flex-wrap content-center justify-center"
                                >
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={`relative text-lg font-bold capitalize text-white ${
                                            activeTab === link.path ? '' : ''
                                        }`}
                                    >
                                        {activeTab === link.path && (
                                            <motion.div
                                                layoutId="active-border"
                                                className="absolute mt-2 flex h-full w-full flex-wrap content-end justify-center"
                                            >
                                                <div className="w-1 rounded-full bg-white p-0.5"></div>
                                            </motion.div>
                                        )}
                                        <span className="relative">
                                            {link.name}
                                        </span>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                    <div className="relative flex w-1/3 justify-center">
                        <div onMouseLeave={() => setIsUserInfoOpen(false)}>
                            <button
                                className="flex items-center gap-1 text-white"
                                onMouseEnter={() => setIsUserInfoOpen(true)}
                                ref={dropdownButtonRef}
                            >
                                {user.avatarUrl === '' ? (
                                    <span className="material-symbols-outlined h-9 w-9 text-3xl">
                                        account_circle
                                    </span>
                                ) : (
                                    <div className="h-9 w-9 rounded-full">
                                        <img
                                            className="h-full w-full rounded-full object-cover"
                                            src={`http://localhost:5000/${user.avatarUrl}`}
                                            alt=""
                                        />
                                    </div>
                                )}
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
                                    className="absolute top-[35px] z-10 w-44 divide-y
                                divide-gray-100 rounded-lg bg-white shadow
                                dark:divide-gray-600 dark:bg-gray-700 max-[768px]:right-0"
                                    ref={dropdownRef}
                                >
                                    <div className="flex flex-col px-4 py-3 text-white">
                                        <span className="truncate">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ul
                                        className="select-none px-4 py-3 text-white"
                                        onClick={() => setIsUserInfoOpen(false)}
                                    >
                                        <li>
                                            <Link
                                                className="block"
                                                to="/userSettings"
                                            >
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="block"
                                                to="/myPosts"
                                            >
                                                My Posts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="block" to="/">
                                                A
                                            </Link>
                                        </li>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
