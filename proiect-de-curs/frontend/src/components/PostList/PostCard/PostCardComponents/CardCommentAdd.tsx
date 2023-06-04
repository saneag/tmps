import React from 'react';
import { motion } from 'framer-motion';

import { CommentInputContext, PostContext } from '../index';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPost, reactToPost } from 'redux/slices/postSlice';
import { Components } from '../../../index';

const CardCommentAdd = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);

    const { setShowCommentInput } = React.useContext(CommentInputContext);
    const { userPost } = React.useContext(PostContext);
    const [comment, setComment] = React.useState('');

    const handleComment = async () => {
        if (comment === '') return;

        await dispatch(
            reactToPost({
                postId: userPost._id,
                reactionType: 'comment',
                email: user.email,
                comment,
            })
        );

        await dispatch(getPost({ postId: userPost._id }));

        setComment('');
        setShowCommentInput(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, top: 100 }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: 100 }}
                className="flex flex-col items-center border-t-2 py-2"
            >
                <div className="flex w-full justify-center gap-2">
                    <div>
                        <Components.ImageRenderer
                            imageUrl={user.avatarUrl}
                            type={'userAvatar'}
                            alt={'userAvatar'}
                            className={'h-7 w-7 rounded-full'}
                        />
                    </div>
                    <div className="relative w-10/12">
                        <textarea
                            className="scrollbar w-full resize-none rounded-xl
                            border-2 border-gray-500 bg-transparent p-2 text-xl
                            shadow-md focus:outline-none"
                            maxLength={300}
                            placeholder="Write a comment..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <span className="absolute -bottom-3 right-0">
                            {comment.length}/300
                        </span>
                    </div>
                </div>
                <div className="mt-5 flex w-10/12 items-center justify-end gap-2">
                    <button
                        className="rounded-xl bg-blue-500 px-3 py-2 text-white"
                        onClick={handleComment}
                    >
                        Comment
                    </button>
                    <button
                        className="rounded-xl bg-red-500 px-3 py-2 text-white"
                        onClick={() => setShowCommentInput(false)}
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default CardCommentAdd;
