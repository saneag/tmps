import { IPost } from '../IPost';

export interface IPostBuilder {
    setCreatorId(creatorId: string): IPostBuilder;
    setTitle(title: string): IPostBuilder;
    setContent(content: string): IPostBuilder;
    setImage(image: string): IPostBuilder;
    setCreatedAt(createdAt: Date): IPostBuilder;
    setUpdatedAt(updatedAt: Date): IPostBuilder;
    setComments(comments: string[]): IPostBuilder;
    setReactions(reactions: string[]): IPostBuilder;
    setTags(tags: string[]): IPostBuilder;

    buildSimplePost(): IPost;
    buildPostWithImages(): IPost;
    buildUpdate(): IPost;
}
