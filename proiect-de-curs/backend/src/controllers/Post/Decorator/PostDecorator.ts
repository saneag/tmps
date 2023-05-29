import { PostFacade } from '../Facade/PostFacade';

export class PostDecorator {
    decorateText(content: string) {
        return new PostFacade().decorateText(content);
    }

    simplifyText(content: string) {
        return new PostFacade().simplifyText(content);
    }
}
