
async function gitUsersDemo() {
    try {
        const resultsElem = document.getElementById('results');
        const usersResp = await fetch("users.json");
        const users = await usersResp.json()
        console.log(users);
        const gitUsers = await Promise.all(users.map(async user => {
            const gitUserResp = await fetch(`http://api.github.com/users/${user.username}`);
            const gitUser = await gitUserResp.json();
            return gitUser;
        }));
        // console.log(gitUsers);
        const images = gitUsers.map(gu => {
            const image = new Image();
            image.src = gu.avatar_url;
            resultsElem.appendChild(image);
            return image;
        })
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 5000)
        })
        images.forEach(img => resultsElem.removeChild(img));
        return gitUsers;
    } catch (err) {
        console.log(`Error: ${err}`)
    } finally {
       console.log('Demo finished.');
    }
}

window.addEventListener('load', () => gitUsersDemo().then(result => console.log(result)))