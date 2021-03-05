document.addEventListener('DOMContentLoaded', init);

async function init() {
    const resp = await fetch('/users.json');
    const users = await resp.json();
    console.log(users);
    const gitResp = await fetch(`https://api.github.com/users/${users[0].username}`);
    const gitUser = await gitResp.json();
    console.log(gitUser);
    const userImage = new Image();
    userImage.src = gitUser.avatar_url;
    document.getElementById('results').appendChild(userImage);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            userImage.remove();
            resolve();
        }, 5000);
    });
    console.log(`Git user: ${gitUser.name} [${gitUser.login}] - demo finished`);
}

// .then(resp => resp.json())
// .then(users => {
//     console.log(users);
//     return fetch(`https://api.github.com/users/${users[0].username}`);
// }).then(resp => resp.json())
// .then(gitUser => {
//     console.log(gitUser);
//     const userImage = new Image();
//     userImage.src = gitUser.avatar_url;
//     document.getElementById('results').appendChild(userImage);
//     return [userImage, gitUser];
// }).then(([userImage, gitUser]) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         userImage.remove();
//         resolve(gitUser);
//     }, 5000);
// })).then(gitUser => {
//     console.log(`Git user: ${gitUser.name} [${gitUser.login}] - demo finished`);
// });