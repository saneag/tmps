import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axios from 'services/axios.service';
import { isAxiosError } from 'axios';

import { IPostExtended } from 'shared/interfaces/IPost';

type Post = {
    limit: number;
    page: number;
    search: string;
};

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async ({ limit, page, search }: Post) => {
        try {
            const response = await axios.get(
                `/get-posts?limit=${limit}&page=${page}&search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );

            return {
                posts: response.data.posts,
                status: response.status as number,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    posts: [],
                    status: error.response?.status,
                };
            }

            return {
                posts: [],
                status: 500,
            };
        }
    }
);

export const getPost = createAsyncThunk(
    'post/getPost',
    async (postId: string) => {
        try {
            const response = await axios.get(`/get-post?postId=${postId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return {};
            }

            return {};
        }
    }
);

export const createBasicPost = createAsyncThunk(
    'post/createBasicPost',
    async ({ title, content }: any, { rejectWithValue }) => {
        try {
            const contentRemovedClass = content.replace(/ class=".*?"/g, '');

            const response = await axios.post(
                '/create-post',
                {
                    title,
                    content: contentRemovedClass,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );

            return {
                status: response.status,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    status: error.response?.status,
                });
            }

            return rejectWithValue({
                status: 500,
            });
        }
    }
);

export const createPostWithImage = createAsyncThunk(
    'post/createPostWithImage',
    async ({ title, content, image }: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                '/create-post-with-image',
                {
                    title,
                    content,
                    image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );

            return {
                status: response.status,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    status: error.response?.status,
                });
            }

            return rejectWithValue({
                status: 500,
            });
        }
    }
);

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (content: string) => {
        try {
            const response = await axios.patch('/update-post', { content });
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return {};
            }

            return {};
        }
    }
);

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId: string) => {
        try {
            const response = await axios.delete(
                `/delete-post?postId=${postId}`
            );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return {};
            }

            return {};
        }
    }
);

export const addPostImage = createAsyncThunk(
    'post/addPostImage',
    async (formData: FormData) => {
        try {
            const response = await axios.post('/post/postImage', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                url: response.data.url,
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return {};
            }

            return {};
        }
    }
);

export const deletePostImage = createAsyncThunk(
    'post/deletePostImage',
    async (filePath: string) => {
        try {
            const fileName = filePath.split('uploads/')[1];
            await axios.delete(`/post/postImage/${fileName}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            return {
                url: '',
            };
        } catch (error) {
            return {
                status: 500,
            };
        }
    }
);

// TODO: implement like, unlike, comment, uncomment
// export const likePost = createAsyncThunk(
//     'post/likePost',
//     async (postId: string) => {
//         try {
//             const response = await axios.post('/like-post', { postId });
//             return response.data;
//         } catch (error) {
//             if (isAxiosError(error)) {
//                 return {};
//             }
//
//             return {};
//         }
//     }
// );
//
// export const unlikePost = createAsyncThunk(
//     'post/unlikePost',
//     async (postId: string) => {
//         try {
//             const response = await axios.post('/unlike-post', { postId });
//             return response.data;
//         } catch (error) {
//             if (isAxiosError(error)) {
//                 return {};
//             }
//
//             return {};
//         }
//     }
// );
//
// export const commentPost = createAsyncThunk(
//     'post/commentPost',
//     async (comment: string) => {
//         try {
//             const response = await axios.post('/comment-post', { comment });
//             return response.data;
//         } catch (error) {
//             if (isAxiosError(error)) {
//                 return {};
//             }
//
//             return {};
//         }
//     }
// );
//
// export const uncommentPost = createAsyncThunk(
//     'post/uncommentPost',
//     async (commentId: string) => {
//         try {
//             const response = await axios.post('/uncomment-post', { commentId });
//             return response.data;
//         } catch (error) {
//             if (isAxiosError(error)) {
//                 return {};
//             }
//
//             return {};
//         }
//     }
// );

const initialState = {
    posts: [],
    status: 200,
    isPostCreated: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostCreated: (state, action) => {
            state.isPostCreated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action: any) => {
            state.posts = action.payload.posts;
            state.status = action.payload.status;
        });
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.status = action.payload.status;
        });
        builder.addCase(createBasicPost.fulfilled, (state, action) => {
            state.status = action.payload.status;
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.status = action.payload.status;
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.status = action.payload.status;
        });
    },
});

export default postSlice.reducer;

export const { setPostCreated } = postSlice.actions;