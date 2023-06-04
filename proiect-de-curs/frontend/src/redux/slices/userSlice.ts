import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axios from 'services/axios.service';
import {
    IUserEdit,
    IUserRegister,
    IUserResponse,
} from 'shared/interfaces/IUser';
import { isAxiosError } from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post('/user/login', credentials);
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
            const response = await axios.post('/user/register', credentials);
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
        const response = await axios.post('/user/logout');

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
        if (!Cookies.get('refreshToken'))
            return {
                isAuthenticated: false,
                userStatus: 401,
                user: {} as IUserResponse,
            };

        const token = await axios.post('/user/refreshAccessToken', {
            refreshToken: Cookies.get('refreshToken'),
        });

        Cookies.set('accessToken', token.data.accessToken);

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

export const getUserByEmail = createAsyncThunk(
    'user/getUserByEmail',
    async (email: string) => {
        try {
            const response = await axios.get(`/user/${email}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                visitedUser: response.data,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    visitedUser: {},
                };
            }

            return {
                visitedUser: {},
            };
        }
    }
);

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    try {
        const response = await axios.get('/users', {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        });
        return {
            users: response.data.users,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                users: [],
            };
        }

        return {
            users: [],
        };
    }
});

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user: IUserEdit) => {
        try {
            const response = await axios.patch(`/user/updateUser`, user, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                status: response ? response.status : 500,
                user: response.data,
                isAuthenticated: true,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    status: error.response ? error.response.status : 409,
                    user: {},
                    isAuthenticated: true,
                };
            }

            return {
                status: 500,
                user: {},
                isAuthenticated: true,
            };
        }
    }
);

export const addUserAvatar = createAsyncThunk(
    'user/addUserAvatar',
    async (formData: FormData) => {
        try {
            const response = await axios.post('/user/userAvatar', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                url: response.data.url,
            };
        } catch (error) {
            return {
                url: '',
            };
        }
    }
);

export const deleteUserAvatar = createAsyncThunk(
    'user/deleteUserAvatar',
    async (filePath: string) => {
        try {
            const fileName = filePath.split('uploads/')[1];
            await axios.delete(`/user/userAvatar/${fileName}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                url: '',
            };
        } catch (error) {
            return {
                status: 500,
            };
        }
    }
);

const initialState = {
    status: 200,
    userStatus: 200,
    isAuthenticated: false,
    user: {} as IUserResponse,
    visitedUser: {} as IUserResponse,
    users: [] as IUserResponse[],
};

export const userSlice = createSlice({
    name: 'user',
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
                state.isAuthenticated = action.payload.isAuthenticated;
            }
        );
        builder.addCase(getUserByEmail.fulfilled, (state, action) => {
            state.visitedUser = action.payload.visitedUser;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = {} as IUserResponse;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        });
        builder.addCase(
            updateUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = action.payload.status;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            }
        );
    },
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;
