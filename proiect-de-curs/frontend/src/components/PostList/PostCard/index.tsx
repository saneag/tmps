import React from 'react';

import { IPostExtended } from 'shared/interfaces/IPost';

import EmojiPicker from './EmojiPicker';
import CardHeader from './PostCardComponents/CardHeader';
import CardBody from './PostCardComponents/CardBody';
import CardFooter from './PostCardComponents/CardFooter';

interface PostCardProps {
    post: IPostExtended;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="w-full rounded-xl bg-gray-300 md:min-w-[600px]">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
        </div>
    );
};

export default PostCard;
