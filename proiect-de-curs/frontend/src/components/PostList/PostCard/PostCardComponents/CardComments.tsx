import React from 'react';
import { motion } from 'framer-motion';
import { PostContext } from '../index';
import { Components } from '../../../index';
import { convertDate } from '../../../../utils/convertDate';
import { Link } from 'react-router-dom';

const CardComments = () => {
    const { userPost } = React.useContext(PostContext);

    return (
        <motion.div
            className={`${userPost.numberOfComments > 0 && 'border-t-2'} ${
                userPost.numberOfComments > 3 &&
                'scrollbar h-60 overflow-y-scroll shadow-inner'
            }`}
        >
            {userPost.comments.map((comment, index) => (
                <div
                    key={index}
                    className="flex flex-col border-b-2 border-dotted border-gray-400 px-2 py-3
                    last:border-b-0"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex">
                            <Link
                                to={`/userProfile/${comment.creator.email}`}
                                className="flex items-center gap-1"
                            >
                                <Components.ImageRenderer
                                    imageUrl={comment.creator.avatarUrl}
                                    type={'userAvatar'}
                                    alt={'userAvatar'}
                                    className={'h-7 w-7 rounded-full'}
                                />
                                <span>
                                    {comment.creator.firstName}{' '}
                                    {comment.creator.lastName}
                                </span>
                            </Link>
                        </div>
                        <span>{comment.content}</span>
                    </div>
                    <div className="flex justify-end">
                        <span>{convertDate(comment.createdAt)}</span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default CardComments;
