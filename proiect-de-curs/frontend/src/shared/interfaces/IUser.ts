export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IUserLogin extends IUser {
    password: string;
}

export interface IUserRegister extends IUserLogin {
    confirmPassword: string;
}

export interface IUserImage extends IUser {
    avatarUrl: string;
}

export interface IUserEdit extends IUser {
    description: string;
    avatarUrl: string;
}

export interface IUserResponse extends IUserImage {
    role: 'user' | 'moderator' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    description: string;
}

export interface IUserExtended extends IUserResponse {
    _id: string;
    friends: string[];
    friendRequests: string[];
    friendRequestsSent: string[];
}
