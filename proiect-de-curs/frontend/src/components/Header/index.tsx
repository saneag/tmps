import React from 'react';

import links from 'assets/headerLinks.json';
import NavbarLinks from './NavbarLinks';
import UserDropdown from './UserDropdown';

const Header = () => {
    const publicLinks = React.useMemo(() => links[0].publicLinks || [], []);
    const dropdownLinks = React.useMemo(() => links[1].dropdownLinks || [], []);

    return (
        <>
            <div className="h-16 bg-blue-800">
                <div className="grid h-full grid-cols-2 content-center justify-items-center md:grid-cols-3">
                    <div className="flex w-1/3 justify-center md:col-start-2">
                        <div className="flex gap-5 rounded-2xl bg-blue-600 px-3 py-1">
                            <NavbarLinks publicLinks={publicLinks} />
                        </div>
                    </div>
                    <div className="relative flex w-1/3 items-center justify-center">
                        <UserDropdown dropdownLinks={dropdownLinks} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
