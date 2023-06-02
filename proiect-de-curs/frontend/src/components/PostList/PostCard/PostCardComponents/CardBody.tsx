import React from 'react';
import { Components } from 'components';
import { IPostExtended } from 'shared/interfaces/IPost';

interface PostCardProps {
    post: IPostExtended;
}

const CardBody = ({ post }: PostCardProps) => {
    return (
        <div
            className={`flex flex-col gap-2 border-b-2 p-3 md:flex-row ${
                !post.image && 'justify-center'
            }`}
        >
            <div
                className={`flex w-full pl-3 ${
                    post.image ? 'md:w-5/12' : 'md:w-8/12'
                } md:p-0`}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="scrollbar max-h-[400px] w-full overflow-y-auto break-words text-lg"
                ></span>
            </div>
            {post.image && (
                <div className="flex w-full items-center md:w-7/12">
                    <Components.ImageRenderer
                        imageUrl={post.image}
                        alt={''}
                        className={'h-60 w-full rounded-2xl object-cover'}
                    />
                </div>
            )}
        </div>
    );
};

export default CardBody;
