export const PostDestructuring = (post: any) => {
    const {
        _id,
        title,
        content,
        reactions,
        tags,
        createdAt,
        updatedAt,
        creatorId,
        image,
    } = post;

    return {
        _id,
        title,
        content,
        reactions,
        tags,
        createdAt,
        updatedAt,
        creatorId,
        image,
    };
};
