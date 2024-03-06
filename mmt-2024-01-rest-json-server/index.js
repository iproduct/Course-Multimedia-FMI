postsElem = document.getElementById('posts');
fetch('http://localhost:3000/api/posts/')
    .then(postsResp => postsResp.json())
    .then(posts => {
        postsElem.innerHTML = 
            '<ul>' + posts.map( post => `<li>${post.title}</li>`).join('') + '</ul>'
    });