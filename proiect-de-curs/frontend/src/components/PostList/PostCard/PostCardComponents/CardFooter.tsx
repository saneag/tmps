import React from 'react';
import EmojiPicker from '../EmojiPicker';
import { PostContext } from '../index';
import { convertDate } from 'utils/convertDate';

const CardFooter = () => {
    const { userPost } = React.useContext(PostContext);

    return (
        <div className="flex items-center justify-between p-3">
            <span>{convertDate(userPost.createdAt)}</span>
            <EmojiPicker />
        </div>
    );
};

export default CardFooter;
