import { Post } from "./post.model.js"


const posts = [
    new Post('Post 1', 'Post 1 Content ...', 'https://abc.com/post1', 5, 1),
    new Post('Post 2', 'Post 2 Content ...', 'https://abc.com/post2', 3, 2),
    new Post('Post 3', 'Post 3 Content ...', 'https://abc.com/post3', 1, 3),
    new Post('Post 4', 'Post 4 Content ...', 'https://abc.com/post4', 0, 4),
]

for (const p of  posts) {
    console.log(p.toString())
}
