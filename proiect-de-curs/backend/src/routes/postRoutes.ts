import express from 'express';

import multerInstance from '../shared/multerInstance';
import { checkAuth } from '../middlewares';
import PostController from '../controllers/Post/PostController';
import path from 'path';
import fs from 'fs';

const postRoutes = express.Router();
const upload = multerInstance.init('postImage').getMulterUpload();

postRoutes.get('/get-post', checkAuth, PostController.getPost);
postRoutes.get('/get-posts', checkAuth, PostController.getPosts);

postRoutes.post('/create-post', checkAuth, PostController.createPost);
postRoutes.post(
    '/create-post-with-image',
    checkAuth,
    PostController.createPostWithImage
);

postRoutes.post(
    '/post/postImage',
    checkAuth,
    upload.single('postImage'),
    (req: any, res) => {
        res.json({
            url: `uploads/postImage/${req.file.filename}`,
        });
    }
);

// TODO: implement like, unlike, comment, uncomment
// postRoutes.post('/like-post', checkAuth, PostController.likePost);
// postRoutes.post('/unlike-post', checkAuth, PostController.unlikePost);
// postRoutes.post('/comment-post', checkAuth, PostController.commentPost);
// postRoutes.post('/uncomment-post', checkAuth, PostController.uncommentPost);

postRoutes.patch('/update-post', checkAuth, PostController.updatePost);

postRoutes.delete('/delete-post', checkAuth, PostController.deletePost);
postRoutes.delete('/post/postImage/:fileName', checkAuth, (req: any, res) => {
    const filePath = path.join(__dirname, `uploads/${req.params.fileName}`);

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong',
            });
            return;
        }

        res.json({
            message: 'File deleted',
        });
    });
});

export default postRoutes;
