async function demo() {
    try {
        const resultsElem = document.getElementById('results');
        const userResp = await fetch('users.json');
        const users = await userResp.json();
        const gitUsers = await Promise.all(
            users.map(async user => {
                const gitUserResp = await fetch(`https://api.github.com/users/${user.name}`);
                const gitUser = await gitUserResp.json();
                if (gitUser.message === "Not Found") {
                    throw `GitHub user '${user.name}' not found.`;
                }
                return gitUser;
            })
        );
        console.log(gitUsers);
        const images = gitUsers.map(gitUser => {
            const img = new Image();
            img.src = gitUser.avatar_url;
            return img;
        }).map(userImage => {
            resultsElem.append(userImage);
            return userImage;
        });
        await new Promise((resolve, reject) => setTimeout(resolve, 6000));
        images.forEach(image => image.remove());
        return 'Demo finished.';
    } catch (err) {
        return `Error fetching Git users: ${err}`;
    }
}
window.addEventListener('load', () => demo().then(result => console.log(result)));
