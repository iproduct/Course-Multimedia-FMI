function init() {
    fetch('users.json')
    .then(usersResp => usersResp.json())
    .then(users => {
        console.log(users);
        return users[0];
    }).then(user => fetch(`http://api.github.com/users/${user.name}`))
    .then(gitResp => gitResp.json())
    .then(gitUser => {
        console.log(gitUser);
        const img = new Image();
        img.src = gitUser.avatar_url;
        document.body.appendChild(img);
        return new Promise((resolve, reject) => setTimeout(resolve, 6000, img))
    }).then(img => {
        img.remove();
        console.log('Demo finished')
    }).catch(er => console.log(err));
}