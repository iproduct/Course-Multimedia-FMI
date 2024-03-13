const GITHUB_API_BASE_URL = 'https://api.github.com/users';
const resultsElem = document.getElementById('results');

fetch('users.json')
    .then(resp => resp.json())
    .then(users => {
        console.log(users);
        userPromises = users.map(user => fetch(`${GITHUB_API_BASE_URL}/${user.username}`)
            .then(resp => resp.json()));
        return Promise.allSettled(userPromises)
            .then(results => {
                gitUsers = results.filter(res => res.status === 'fulfilled').map(res => res.value)
                console.log(gitUsers);
                return gitUsers.map(user => {
                    const image = new Image();
                    image.src = user.avatar_url;
                    resultsElem.appendChild(image);
                    return image;
                });
            })
    }).then(images => new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, images)
    })).then(images => {
        images.forEach(image => {
            image.remove();
        });
    }).finally(() => console.log("Demo finished."));
