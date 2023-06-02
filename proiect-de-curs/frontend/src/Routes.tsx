import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Pages } from './pages';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<Pages.Home />} />
                <Route path="/groups" element={<Pages.Groups />} />
                <Route path="/userProfile" element={<Pages.UserProfile />} />
                <Route
                    path="/userProfile/:email"
                    element={<Pages.UserProfileAsGuest />}
                />
                <Route path="/myPosts/:email" element={<Pages.MyPosts />} />
                <Route path="*" element={<Pages.Home />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="*" element={<Pages.Login />} />
        </Routes>
    );
};
