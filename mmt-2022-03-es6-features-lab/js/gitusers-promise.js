
function gitUsersDemo(){
    const resultsElem = document.getElementById('results');
    fetch("users.json")
    .then(usersResp => usersResp.json())
    .then(users => {
        console.log(users);
        return fetch(`http://api.github.com/users/${users[0].username}`)
    }).then(gitUserResp => gitUserResp.json())
    .then(gitUser => {
        console.log(gitUser);
        const image = new Image();
        image.src = gitUser.avatar_url;
        resultsElem.appendChild(image);
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 5000, image)
        })
    }).then(img => {
        resultsElem.removeChild(img);
    }).finally(()=>console.log('Demo finished.'))
}

window.addEventListener('load', gitUsersDemo)