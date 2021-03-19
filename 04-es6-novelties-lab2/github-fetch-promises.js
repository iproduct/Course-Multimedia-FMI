function demo() {
    fetch('users.json')
        .then(userResp => userResp.json())
        .then(users => console.log(users));
}

window.addEventListener('load', demo)