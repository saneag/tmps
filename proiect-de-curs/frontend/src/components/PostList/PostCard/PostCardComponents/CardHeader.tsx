import React from 'react';
import { Components } from 'components';
import EditButtons from '../EditButtons';
import { useAppSelector } from 'redux/store';
import { Link } from 'react-router-dom';
import { PostContext } from '../index';

const CardHeader = () => {
    const user = useAppSelector((state) => state.userReducer.user);
    const { userPost } = React.useContext(PostContext);

    return (
        <div className="grid grid-cols-3 items-center border-b-2 p-3">
            <div className="flex w-52 items-center gap-2">
                <Link
                    to={`/userProfile/${userPost.creator.email}`}
                    className="flex"
                >
                    <Components.ImageRenderer
                        imageUrl={userPost.creator.avatarUrl}
                        type={'userAvatar'}
                        alt={''}
                        className={`h-10 w-10 rounded-full text-4xl ${
                            userPost.creator.avatarUrl !== '' && 'shadow-md'
                        }`}
                    />
                </Link>
                <Link to={`/userProfile/${userPost.creator.email}`}>
                    <span className="text-lg">
                        {userPost.creator.firstName} {userPost.creator.lastName}
                    </span>
                </Link>
            </div>
            <div className="col-span-3 row-start-2 flex justify-center text-center md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1">
                <span className="w-full overflow-ellipsis text-2xl font-bold">
                    {userPost.title}
                </span>
            </div>
            {userPost.creator.email === user.email && (
                <div className="col-start-3 flex justify-end pr-1">
                    <EditButtons postId={userPost._id} />
                </div>
            )}
        </div>
    );
};

export default CardHeader;
