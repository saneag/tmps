import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IPostExtended } from 'shared/interfaces/IPost';

import CardHeader from './PostCardComponents/CardHeader';
import CardBody from './PostCardComponents/CardBody';
import CardFooter from './PostCardComponents/CardFooter';
import CardCommentAdd from './PostCardComponents/CardCommentAdd';
import CardComments from './PostCardComponents/CardComments';

interface PostCardProps {
    post: IPostExtended;
}

export const CommentInputContext = React.createContext({
    showCommentInput: false,
    setShowCommentInput: (value: boolean) => {},
});

export const PostContext = React.createContext({
    userPost: {} as IPostExtended,
    setUserPost: (value: IPostExtended) => {},
});

const PostCard = ({ post }: PostCardProps) => {
    const [showCommentInput, setShowCommentInput] = React.useState(false);
    const [userPost, setUserPost] = React.useState<IPostExtended>(post);

    React.useEffect(() => {
        setUserPost(post);
    }, [post]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-xl bg-gray-300"
        >
            <PostContext.Provider value={{ userPost, setUserPost }}>
                <CardHeader />
                <CardBody />
                <CommentInputContext.Provider
                    value={{ showCommentInput, setShowCommentInput }}
                >
                    <CardFooter />
                    <AnimatePresence>
                        {showCommentInput && <CardCommentAdd />}
                    </AnimatePresence>
                </CommentInputContext.Provider>
                <CardComments />
            </PostContext.Provider>
        </motion.div>
    );
};

export default PostCard;
