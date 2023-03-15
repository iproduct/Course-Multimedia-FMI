import { ApiClient } from './service/api-client.js'

const formElem = document.getElementById('edit-post');
const resultsElem = document.getElementById('results');
const API_CLIENT = new ApiClient('posts');
let allPosts = [];

function init() {
    API_CLIENT.findAll().then(posts => {
        allPosts = posts;
        showPosts();
    });
}

function showPosts() {
    const postItems = allPosts.reduce((acc, post) => acc + `<div class="item">${post.id}: ${post.title} -- by ${post.author}</div>\n`, '');
    resultsElem.innerHTML = postItems;
}

function addNewPost(event) {
    event.preventDefault();
    const formData = new FormData(formElem);
    const newPost = Object.fromEntries(formData.entries());
    console.log(newPost);
    API_CLIENT.create(newPost)
        .then(newPost => {
            allPosts = allPosts.concat(newPost);
            formElem.reset();
            showPosts();
        })
}

formElem.addEventListener('submit', addNewPost);

init();