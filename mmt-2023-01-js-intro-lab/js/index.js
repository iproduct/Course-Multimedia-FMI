async function init() {
    const resp = await fetch('http://localhost:9000/posts');
    const posts = await resp.json();
    const postItems = posts.reduce((acc, post) => acc + `<li>${post.id}: ${post.title} -- by ${post.author}</li>\n`, '')
    document.getElementById('results').innerHTML = `<ul>${postItems}</ul>`
}

init()