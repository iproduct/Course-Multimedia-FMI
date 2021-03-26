function demo() {
    const resultsElem = document.getElementById('results');
    return fetch('users.json')
        .then(userResp => userResp.json())
        .then(users =>
            Promise.all(
                users.map(user => fetch(`https://api.github.com/users/${user.name}`)
                    .then(gitUserResp => gitUserResp.json())
                    .then(gitUser => gitUser.message === "Not Found" ? 
                        Promise.reject(`GitHub user '${user.name}' not found.`):
                        gitUser
                    )
                ))
        ).then(gitUsers => {
            console.log(gitUsers);
            return gitUsers.map(gitUser => {
                const img = new Image();
                img.src = gitUser.avatar_url;
                return img;
            }).map(userImage => {
                resultsElem.append(userImage);
                return userImage;
            })
        }).then(images => new Promise((resolve, reject) =>
            setTimeout(resolve, 6000, images)
        )).then(images => {
            images.forEach(image => image.remove());
            return 'Demo finished';
        }).catch(err => `Error fetching Git users: ${err}`);
}

window.addEventListener('load', () => demo().then(result => console.log(result)));
