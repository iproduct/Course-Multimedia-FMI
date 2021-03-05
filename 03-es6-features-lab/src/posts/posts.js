// const Entity = require('../common/entity');
import Entity from '../common/entity.js';

class Post extends Entity {
    status = 'active';
    constructor(title, author, text, tags, imageUrl, status = true) {
        super({});
        this.title = title;
        this.author = author;
        this.text = text;
        this.tags = tags;
        this.imageUrl = imageUrl;
        this.status = status;
    }
    toString() {
        return `${super.toString()}, 
        title: ${this.title}, 
        author: ${this.author}, 
        text: ${this.text}, 
        tags: ${this.tags}, 
        imageUrl: ${this.imageUrl}, 
        info: ${this.info}, 
        status: ${this.status}`;
    }
}

export default Post;
// module.exports = Post;