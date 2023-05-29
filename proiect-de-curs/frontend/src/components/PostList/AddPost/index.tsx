import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import PostForm from './PostForm';
import { AnimatePresence } from 'framer-motion';
import { Components } from '../../index';

const AddPost = () => {
    const user = useSelector((state: RootState) => state.userReducer.user);

    const [isAddPostFormOpen, setIsAddPostFormOpen] =
        React.useState<boolean>(false);

    return (
        <>
            <div
                className="max-w-[420px]:flex-col flex w-full items-center
                gap-3 rounded-2xl bg-gray-500 p-2 md:w-[600px]"
            >
                <div className="flex w-2/12 justify-center">
                    <div className="flex flex-wrap items-center justify-center rounded-full">
                        <Components.ImageRenderer
                            imageUrl={user.avatarUrl}
                            type={'userAvatar'}
                            alt={'No avatar'}
                            className={
                                'flex h-14 w-14 items-center justify-center rounded-full object-cover text-5xl'
                            }
                        />
                    </div>
                </div>
                <div className="flex w-10/12">
                    <div
                        className="flex w-full cursor-pointer items-center rounded-2xl bg-gray-600 p-3 hover:bg-gray-700"
                        onClick={() => setIsAddPostFormOpen(true)}
                    >
                        <span className="text-2xl text-white">
                            What is new for today?
                        </span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isAddPostFormOpen && (
                    <PostForm setIsAddPostFormOpen={setIsAddPostFormOpen} />
                )}
            </AnimatePresence>
        </>
    );
};

export default AddPost;
