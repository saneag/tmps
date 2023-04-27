import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Pages } from './pages';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<Pages.Home />} />
                <Route path="/userSettings" element={<Pages.UserSettings />} />
                <Route path="*" element={<Pages.Home />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Pages.Login />} />
            <Route path="*" element={<Pages.Login />} />
        </Routes>
    );
};
