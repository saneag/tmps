import React from 'react';
import { NavLink } from 'react-router-dom';

import links from 'assets/headerLinks.json';

interface Links {
    name: string;
    path: string;
}

const Header = () => {
    const publicLinks: Links[] = links[0].publicLinks
        ? links[0].publicLinks
        : [];

    return (
        <>
            <div></div>
            <div className="flex gap-3 justify-center content-center flex-wrap bg-blue-800 h-14">
                {publicLinks.map((link: Links) => {
                    return (
                        <div>
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className="text-white text-lg font-bold capitalize"
                            >
                                {link.name}
                            </NavLink>
                        </div>
                    );
                })}
            </div>
            <div></div>
        </>
    );
};

export default Header;
