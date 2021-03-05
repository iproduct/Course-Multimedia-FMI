var nextId = 0;

function Document(title, author, creationDate) {
    this.id = ++nextId;
    this.title = title;
    this.author = author;
    this.creationDate = creationDate;
}

Document.prototype.toString = function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return 'title: ' + this.title + ', author: ' + this.author + ', created: '
     + this.creationDate.getDate() + ' ' + months[this.creationDate.getMonth()] + ',' + this.creationDate.getFullYear();
}

function Post(title, author, creationDate, text, tags, imageUrl) {
    Document.call(this, title, author, creationDate);
    this.text = text;
    this.tags = tags;
    this.imageUrl = imageUrl;
}

Post.prototype = Object.create(Document.prototype);
Post.prototype.constructor = Post;

Post.prototype.toString = function() {
    return Document.prototype.toString.call(this) 
    + ', text: ' + this.text + ', tags: ' + this.tags + ', imageUrl: ' + this.imageUrl;
}

var doc1 = new Document('New in ECMAScript', 'Douglas Crockford', new Date());

console.log(doc1.toString());

var post1 = new Post('CSS Layout Approaches', 'Tryan Iliev', new  Date(), 
    'Three main approaches are ...', 'css layaout grid flexbox float', 
    'https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-02.svg');

console.log(post1.toString());

