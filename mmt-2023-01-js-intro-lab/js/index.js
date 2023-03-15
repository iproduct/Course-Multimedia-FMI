import { ApiClient } from './service/api-client.js'

const formElem = document.getElementById('edit-post');
const resultsElem = document.getElementById('results');
const API_CLIENT = new ApiClient('posts');

let allPosts = [];

const createItemMarkup = 
    (post) => `
    <div class="item">
        <span class="post-data">${post.id}: ${post.title} -- by ${post.author}</span>
        <span class="controls"><button class="danger" data-id="${post.id}" data-action="delete">Delete</button></span>
    </div>\n`;



function init() {
    API_CLIENT.findAll().then(posts => {
        allPosts = posts;
        showPosts();
    });
}

function showPosts() {
    const postItems = allPosts.reduce((acc, post) => acc + createItemMarkup(post), '');
    resultsElem.innerHTML = postItems;
}

function addNewPost(event) {
    event.preventDefault();
    const formData = new FormData(formElem);
    const newPost = Object.fromEntries(formData.entries());
    API_CLIENT.create(newPost)
        .then(newPost => {
            allPosts = allPosts.concat(newPost);
            formElem.reset();
            showPosts();
        })
}

async function deletePost(id) {
    await API_CLIENT.deleteById(id);
    allPosts = allPosts.filter(post => post.id !== id);
    showPosts();
}

function handleItemAction(event) {
    if(event.target.tagName === 'BUTTON' && event.target.dataset.action === 'delete') {
        deletePost(+event.target.dataset.id) 
    }
}

formElem.addEventListener('submit', addNewPost);
resultsElem.addEventListener('click', handleItemAction, true);

init();