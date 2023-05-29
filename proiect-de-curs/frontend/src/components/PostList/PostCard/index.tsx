import React from 'react';
import { motion } from 'framer-motion';

import { IPostExtended } from 'shared/interfaces/IPost';

import CardHeader from './PostCardComponents/CardHeader';
import CardBody from './PostCardComponents/CardBody';
import CardFooter from './PostCardComponents/CardFooter';

interface PostCardProps {
    post: IPostExtended;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-xl bg-gray-300 md:min-w-[600px]"
        >
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
        </motion.div>
    );
};

export default PostCard;
