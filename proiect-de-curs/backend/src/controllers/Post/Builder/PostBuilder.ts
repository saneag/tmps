import { IPostBuilder } from '../../../interfaces/IPost/Builder/IPostBuilder';
import { IPost, IPostImage } from '../../../interfaces/IPost/IPost';

export class PostBuilder implements IPostBuilder {
    public creatorId: string;
    public title: string;
    public content: string;
    public image: string;
    public createdAt: Date;
    public updatedAt: Date;
    public comments: string[];
    public reactions: string[];
    public tags: string[];

    constructor() {
        this.creatorId = '';
        this.title = '';
        this.content = '';
        this.image = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.comments = [];
        this.reactions = [];
        this.tags = [];
    }

    setComments(comments: string[]): IPostBuilder {
        this.comments = comments;
        return this;
    }

    setContent(content: string): IPostBuilder {
        this.content = content;
        return this;
    }

    setImage(image: string): IPostBuilder {
        this.image = image;
        return this;
    }

    setCreatedAt(createdAt: Date): IPostBuilder {
        this.createdAt = createdAt;
        return this;
    }

    setReactions(reactions: string[]): IPostBuilder {
        this.reactions = reactions;
        return this;
    }

    setTags(tags: string[]): IPostBuilder {
        this.tags = tags;
        return this;
    }

    setTitle(title: string): IPostBuilder {
        this.title = title;
        return this;
    }

    setUpdatedAt(updatedAt: Date): IPostBuilder {
        this.updatedAt = updatedAt;
        return this;
    }

    setCreatorId(creatorId: string): IPostBuilder {
        this.creatorId = creatorId;
        return this;
    }

    buildSimplePost(): IPost {
        return {
            creatorId: this.creatorId,
            title: this.title,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            comments: this.comments,
            reactions: this.reactions,
            tags: this.tags,
        };
    }

    buildPostWithImages(): IPostImage {
        return {
            creatorId: this.creatorId,
            title: this.title,
            content: this.content,
            image: this.image,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            comments: this.comments,
            reactions: this.reactions,
            tags: this.tags,
        };
    }

    buildUpdate(): IPost {
        return {
            creatorId: this.creatorId,
            title: this.title,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            comments: this.comments,
            reactions: this.reactions,
            tags: this.tags,
        };
    }
}
