export class Post {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public authorId: string,
        public content: string,
        public imageUrl: string,
        public categories: string[],
        public keywords: string[]
    ) { }
}