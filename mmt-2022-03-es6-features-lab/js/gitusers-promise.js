
function gitUsersDemo() {
    const resultsElem = document.getElementById('results');
    fetch("users.json")
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return Promise.all(users.map(user => {
                return fetch(`http://api.github.com/users/${user.username}`)
                    .then(gitUserResp => gitUserResp.json())
            }));
        })
        .then(gitUsers => {
            console.log(gitUsers);
            const images = gitUsers.map(gu => {
                const image = new Image();
                image.src = gu.avatar_url;
                resultsElem.appendChild(image);
                return image;
            })
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 5000, images)
            })
        }).then(images => {
            images.forEach(img => resultsElem.removeChild(img));
        }).finally(() => console.log('Demo finished.'))
}

window.addEventListener('load', gitUsersDemo)