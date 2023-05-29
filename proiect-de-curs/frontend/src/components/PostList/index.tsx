import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getPosts, resetPosts, setPostCreated } from 'redux/slices/postSlice';

import PostCard from './PostCard';
import { IPostExtended } from '../../shared/interfaces/IPost';
import PostListSkeleton from './PostListSkeleton';
import SearchPost from '../SearchPost';

interface IPostList {
    children?: React.ReactNode;
}

const PostList = ({ children }: IPostList) => {
    const dispatch = useAppDispatch();
    const { email } = useParams();

    const posts = useAppSelector((state) => state.postReducer.posts);
    const totalPostsNumber = useAppSelector(
        (state) => state.postReducer.totalPostsNumber
    );
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const isPostCreated = useAppSelector(
        (state) => state.postReducer.isPostCreated
    );

    const fetchPosts = async (limit = 10) => {
        try {
            dispatch(resetPosts());
            await dispatch(getPosts({ limit, page, search, email }));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMorePosts = async () => {
        try {
            await dispatch(
                getPosts({ limit: 10, page: page + 1, search, email })
            );
            setPage((prev) => prev + 1);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchPosts();
    }, [search]);

    React.useEffect(() => {
        if (isPostCreated) {
            fetchPosts();
            dispatch(setPostCreated(false));
        }
    }, [isPostCreated]);

    return (
        <div
            className="container flex w-full flex-col
            gap-10 md:w-10/12 lg:w-8/12 xl:w-6/12"
        >
            <SearchPost search={search} setSearch={setSearch} />
            {children}
            <InfiniteScroll
                next={fetchMorePosts}
                hasMore={posts.length < totalPostsNumber}
                loader={<PostListSkeleton />}
                dataLength={posts.length}
                className="flex flex-col gap-10"
            >
                {posts.map((post: IPostExtended) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default PostList;
