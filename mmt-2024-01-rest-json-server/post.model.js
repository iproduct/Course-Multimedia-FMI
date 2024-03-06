export class Post {
    constructor(title, content, imageUrl = null, views = 0, id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.views = views;
    }
    toString() {
        return `${this.id}: ${this.title}: ${this.content} -> ${this.views} views`
    }
}

