export class Post {
    public _id: string;
    constructor(
        public title: string,
        public authorId: string,
        public content: string,
        public imageUrl: string,
        public categories: string[],
        public keywords: string[]
    ) { }
}