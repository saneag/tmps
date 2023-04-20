import { UserBuilder } from '../controllers/User/UserBuilder';

export interface IUserRegister {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    avatarUrl: string;
    description: string;
}

export interface IUserBuilder extends IUserRegister {
    setFirstName(firstName: string): UserBuilder;
    setLastName(lastName: string): UserBuilder;
    setEmail(email: string): UserBuilder;
    setPasswordHash(passwordHash: string): UserBuilder;
    setAvatarUrl(avatarUrl: string): UserBuilder;
    setDescription(description: string): UserBuilder;

    build(): IUserRegister;
}
