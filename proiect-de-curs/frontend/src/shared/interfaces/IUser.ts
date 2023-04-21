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

export interface IUserResponse extends IUser {
    role: 'user' | 'moderator' | 'admin';
    avatarUrl: string;
    createdAt: Date;
}

export interface IUserExtended extends IUserResponse {
    _id: string;
    updatedAt: Date;
    friends: string[];
    friendRequests: string[];
    friendRequestsSent: string[];
}
