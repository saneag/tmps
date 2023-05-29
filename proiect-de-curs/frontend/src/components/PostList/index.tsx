import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPosts, setPostCreated } from 'redux/slices/postSlice';

import AddPost from './AddPost';
import PostCard from './PostCard';
import { IPostExtended } from '../../shared/interfaces/IPost';

const PostList = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.postReducer.posts);
    const isPostCreated = useAppSelector(
        (state) => state.postReducer.isPostCreated
    );

    const fetchPosts = async () => {
        try {
            const limit = 10;
            const page = 1;
            const search = '';
            await dispatch(getPosts({ limit, page, search }));
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    React.useEffect(() => {
        if (isPostCreated) {
            fetchPosts();
            dispatch(setPostCreated(false));
        }
    }, [isPostCreated]);

    return (
        <div
            className="container flex w-full flex-col items-center
            gap-10 px-4 md:w-6/12"
        >
            <AddPost />
            {posts.length > 0 ? (
                posts.map((post: IPostExtended) => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default PostList;
