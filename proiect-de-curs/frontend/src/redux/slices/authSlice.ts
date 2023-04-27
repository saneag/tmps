import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axios from 'services/axios.service';
import { IUserRegister, IUserResponse } from 'shared/interfaces/IUser';
import { isAxiosError } from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post('/login', credentials);
            Cookies.set('accessToken', response.data.accessToken);
            Cookies.set('refreshToken', response.data.refreshToken);

            const userResponse = await axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${response.data.accessToken}`,
                },
            });

            return {
                isAuthenticated: true,
                status: response ? response.status : 401,
                user: userResponse.data,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    isAuthenticated: false,
                    status: error.response ? error.response.status : 401,
                };
            }

            return {
                isAuthenticated: false,
                status: 401,
            };
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: IUserRegister) => {
        try {
            const response = await axios.post('/register', credentials);
            return {
                isAuthenticated: false,
                status: response ? response.status : 500,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    isAuthenticated: false,
                    status: error.response ? error.response.status : 401,
                };
            }

            return {
                isAuthenticated: false,
                status: 500,
            };
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await axios.post('/logout');

        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        return {
            isAuthenticated: false,
            status: response ? response.status : 500,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                isAuthenticated: false,
                status: error.response ? error.response.status : 401,
            };
        }

        return {
            isAuthenticated: false,
            status: 500,
        };
    }
});

export const getUser = createAsyncThunk('auth/getUser', async () => {
    try {
        const response = await axios.get('/user', {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        });

        return {
            isAuthenticated: true,
            userStatus: response.status,
            user: response.data,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                isAuthenticated: false,
                userStatus: error.response ? error.response.status : 401,
                user: {} as IUserResponse,
            };
        }

        return {
            isAuthenticated: false,
            userStatus: 500,
            user: {} as IUserResponse,
        };
    }
});

const initialState = {
    status: 200,
    userStatus: 200,
    isAuthenticated: false,
    user: {} as IUserResponse,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 200;
        },
        resetUserStatus: (state) => {
            state.status = 200;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUser.fulfilled,
            (
                state,
                action: PayloadAction<{
                    isAuthenticated: boolean;
                    userStatus: number;
                    user: IUserResponse;
                }>
            ) => {
                state.user = action.payload.user;
                state.userStatus = action.payload.userStatus;
            }
        );
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = {} as IUserResponse;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        });
        builder
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action: PayloadAction<any>) => {
                    state.status = action.payload.status;
                    state.isAuthenticated = action.payload.isAuthenticated;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<any>) => {
                    state.status = action.payload.status;
                    state.isAuthenticated = action.payload.isAuthenticated;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 200;
                    state.isAuthenticated = false;
                }
            );
    },
});

export const { resetStatus } = authSlice.actions;

export default authSlice.reducer;
