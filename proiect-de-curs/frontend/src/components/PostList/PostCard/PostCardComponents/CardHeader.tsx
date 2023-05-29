import React from 'react';
import { Components } from 'components';
import EditButtons from '../EditButtons';
import { useAppSelector } from 'redux/store';
import { IPostExtended } from 'shared/interfaces/IPost';
import { Link } from 'react-router-dom';

interface PostCardProps {
    post: IPostExtended;
}

const CardHeader = ({ post }: PostCardProps) => {
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        <div className="grid grid-cols-3 items-center border-b-2 p-3">
            <div className="flex w-52 items-center gap-2">
                <Link to={`/userProfile/${post.creator.email}`}>
                    <Components.ImageRenderer
                        imageUrl={post.creator.avatarUrl}
                        type={'userAvatar'}
                        alt={''}
                        className={'h-10 w-10 rounded-full shadow-md'}
                    />
                </Link>
                <Link to={`/userProfile/${post.creator.email}`}>
                    <span className="text-lg">
                        {post.creator.firstName} {post.creator.lastName}
                    </span>
                </Link>
            </div>
            <div className="col-start-2 row-start-2 flex justify-center md:row-start-1">
                <span className="max-w-[100px] overflow-ellipsis text-2xl font-bold">
                    {post.title}
                </span>
            </div>
            {post.creator.email === user.email && (
                <div className="col-start-3 flex justify-end pr-1">
                    <EditButtons />
                </div>
            )}
        </div>
    );
};

export default CardHeader;
