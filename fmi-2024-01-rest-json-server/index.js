import POSTS_SERVICE from './posts.service.js';

const postsElem = document.getElementById('posts');
async function showPosts() {
    const posts = await POSTS_SERVICE.getAllPosts();
    postsElem.innerHTML = '<ul>' + posts.map( post => `<li>${post.title}</li>`).join('') + '</ul>'
}

showPosts();