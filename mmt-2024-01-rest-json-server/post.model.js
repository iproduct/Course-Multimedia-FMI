import { Entity } from "./entity.model.js";

export class Post extends Entity {
    constructor(title, content, imageUrl = null, views = 0, id) {
        super(id);
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.views = views;
    }
    toString() {
        return `${super.toString()}: ${this.title}: ${this.content} -> ${this.views} views`
    }
}

