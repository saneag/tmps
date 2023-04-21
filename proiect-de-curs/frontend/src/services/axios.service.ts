import axios from 'axios';

import {
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
} from 'utils/tokenValidation';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/hf',
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        if (originalConfig.url !== '/login' && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const response = await instance.post('/refresh', {
                        refreshToken: getRefreshToken(),
                    });

                    saveAccessToken(response.data.accessToken);

                    return instance(originalConfig);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    }
);

export default instance;
