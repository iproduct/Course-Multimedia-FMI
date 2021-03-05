document.addEventListener('DOMContentLoaded', init);

function init() {
    return fetch('/users.json')
        .then(resp => resp.json())
        .then(users => Promise.all(users.map(
            user => fetch(`https://api.github.com/users/${user.username}`).then(resp => resp.json()))))
        .then(gitUsers => {
            console.log(gitUsers);
            const userImages = gitUsers.map(user => {
                const userImage = new Image();
                userImage.src = user.avatar_url;
                document.getElementById('results').appendChild(userImage);
                return userImage
            });
            return [userImages, gitUsers];
        }).then(([userImages, gitUsers]) =>
            Promise.all(userImages.map((userImg, index) => new Promise((resolve, reject) => {
                setTimeout(() => {
                    userImg.remove();
                    resolve(gitUsers[index]);
                }, (index + 1) * 1000); // timeout
            })))
        ).then(gitUsers => {
            gitUsers.forEach(gitUser => {
                console.log(`Git user: ${gitUser.name} [${gitUser.login}] - demo finished`);
            });
        });
    //https://iproduct:<your-pass>@api.github.com/users/${users[0].username}`
}