import React from 'react';
import EmojiPicker from '../EmojiPicker';
import { IPostExtended } from 'shared/interfaces/IPost';

interface PostCardProps {
    post: IPostExtended;
}

const CardFooter = ({ post }: PostCardProps) => {
    const convertDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="p-3">
            <EmojiPicker postId={post._id} />
            <span>{convertDate(post.createdAt)}</span>
        </div>
    );
};

export default CardFooter;
