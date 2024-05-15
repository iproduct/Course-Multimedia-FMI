import { IdType } from "../../shared/shared-types";


export enum PostStatus{
    Published = 1, Created, Archived
}

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string,
        public authorId: IdType,
        public publishDate: number,
        public tags: string[],
        public imageUrl: string,
        public status: PostStatus = PostStatus.Published,
        public id?: IdType
    ) {}
}

export class Post extends PostCreateDto{
    static className = 'Post';
    override id: IdType = 0;
}

export type PostFilterType = PostStatus | undefined;
