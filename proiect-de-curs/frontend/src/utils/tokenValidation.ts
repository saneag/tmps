import Cookies from 'js-cookie';

export function getRefreshToken() {
    return Cookies.get('refreshToken');
}

export function saveAccessToken(accessToken: string) {
    Cookies.set('accessToken', accessToken);
}

export function getAccessToken() {
    return Cookies.get('accessToken');
}
