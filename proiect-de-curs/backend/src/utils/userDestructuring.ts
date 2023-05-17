export const userDestructuring = (user: any) => {
    const {
        firstName,
        lastName,
        email,
        role,
        avatarUrl,
        description,
        createdAt,
        updatedAt,
    } = user;

    return {
        firstName,
        lastName,
        email,
        role,
        avatarUrl,
        description,
        createdAt,
        updatedAt,
    };
};
