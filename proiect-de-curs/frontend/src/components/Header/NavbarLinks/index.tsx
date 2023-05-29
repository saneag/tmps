import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Links {
    name: string;
    path: string;
    icon?: string;
}

interface ILinks {
    publicLinks: Links[];
}

const NavbarLinks = ({ publicLinks }: ILinks) => {
    const location = useLocation();

    const [activeTab, setActiveTab] = React.useState<string>('');

    React.useEffect(() => {
        if (publicLinks.some((link) => link.path === location.pathname)) {
            setActiveTab(location.pathname);
        } else {
            setActiveTab('');
        }
    }, [location.pathname, publicLinks]);

    return (
        <>
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
                            className={`relative text-lg font-bold text-white ${
                                activeTab === link.path ? '' : ''
                            }`}
                            title={link.name}
                        >
                            {activeTab === link.path && (
                                <motion.div
                                    layoutId="active-border"
                                    className="absolute flex h-full w-full flex-wrap content-end justify-center"
                                >
                                    <div className="h-10 w-full rounded-full bg-blue-900"></div>
                                </motion.div>
                            )}
                            <span className="material-symbols-outlined relative z-10 rounded-full px-3 text-3xl">
                                {link.icon}
                            </span>
                        </NavLink>
                    </div>
                );
            })}
        </>
    );
};

export default NavbarLinks;
