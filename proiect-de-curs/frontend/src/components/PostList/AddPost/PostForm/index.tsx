import React from 'react';
import { motion } from 'framer-motion';
import { FileUploader } from 'react-drag-drop-files';

import { useAppDispatch } from 'redux/store';
import {
    addPostImage,
    createBasicPost,
    createPostWithImage,
    deletePostImage,
    setPostCreated,
} from 'redux/slices/postSlice';

import FormTitle from './FormFields/FormTitle';
import FormContent from './FormFields/FormContent';

interface IProps {
    setIsAddPostFormOpen: (isAddPostFormOpen: boolean) => void;
}

const PostForm = ({ setIsAddPostFormOpen }: IProps) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = React.useState<string>('');
    const [content, setContent] = React.useState<string>('');
    const [image, setImage] = React.useState<string>('');

    const fileTypes = ['JPG', 'PNG', 'JPEG'];

    const handleSubmit = async () => {
        const removedClass = content.replace(/ class=".*?"/g, '');

        if (image !== '') {
            await dispatch(
                createPostWithImage({ title, content: removedClass, image })
            );
        } else {
            await dispatch(createBasicPost({ title, content: removedClass }));
        }
        setIsAddPostFormOpen(false);
        dispatch(setPostCreated(true));
    };

    const handleChangeFile = async (e: any) => {
        const formData = new FormData();
        if (image && e.name !== image.split('uploads/')[1]) {
            await dispatch(deletePostImage(image));
        }
        formData.append('postImage', e);

        const { payload } = await dispatch(addPostImage(formData));
        const { url } = payload as { url: string };
        setImage(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsAddPostFormOpen(false)}
            className="fixed left-0 top-0 z-50 flex h-full w-full
            justify-center bg-gray-700 bg-opacity-80 pt-10"
        >
            <div
                className="flex h-fit w-10/12 flex-col content-center
                justify-center rounded-2xl bg-gray-300 md:w-[800px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button
                        className="mr-3 mt-3 rounded-full bg-gray-500
                    p-2 hover:bg-gray-600"
                        onClick={() => setIsAddPostFormOpen(false)}
                    >
                        <span className="material-symbols-outlined block text-white">
                            close
                        </span>
                    </button>
                </div>
                <div className="flex w-full flex-col gap-3 py-4">
                    <FormTitle title={title} setTitle={setTitle} />
                    <FormContent content={content} setContent={setContent} />
                    <div className="flex justify-center">
                        <FileUploader
                            handleChange={handleChangeFile}
                            name="file"
                            types={fileTypes}
                            multiple={false}
                            label="Drag & Drop your avatar here"
                            classes="md:!min-w-[322px] !min-w-[200px]"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className={`rounded-xl px-10 py-3
                            text-white ${
                                title === '' || content === ''
                                    ? 'cursor-not-allowed bg-blue-400'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                            disabled={title === '' || content === ''}
                            onClick={handleSubmit}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PostForm;
