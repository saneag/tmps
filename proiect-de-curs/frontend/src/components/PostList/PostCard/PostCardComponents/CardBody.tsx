import React from 'react';
import { Components } from 'components';
import { PostContext } from '../index';

const CardBody = () => {
    const { userPost } = React.useContext(PostContext);

    return (
        <div
            className={`flex flex-col gap-2 border-b-2 p-3 lg:flex-row ${
                !userPost.image && 'justify-center'
            }`}
        >
            <div
                className={`flex w-full items-center pl-3 ${
                    userPost.image ? 'lg:w-5/12' : 'lg:w-8/12'
                } lg:p-0`}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: userPost.content }}
                    className="scrollbar max-h-[400px] w-full overflow-y-auto break-words text-lg"
                ></span>
            </div>
            {userPost.image && (
                <div className="flex w-full items-center lg:w-7/12">
                    <Components.ImageRenderer
                        imageUrl={userPost.image}
                        alt={''}
                        className={'w-full rounded-2xl'}
                    />
                </div>
            )}
        </div>
    );
};

export default CardBody;
