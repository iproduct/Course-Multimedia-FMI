const GITHUB_API_BASE_URL = 'https://api.github.com/users';
const resultsElem = document.getElementById('results');

(async function () {
    try {
        const resp = await fetch('users.json');
        if (resp.status >= 400) {
            throw `Error fetching JSON from server: ${resp.status} - ${resp.statusText}`
        } 
        const users = await resp.json();
        console.log(users);
        const gitUsersPromises = users.map(async user => {
            const resp = await fetch(`${GITHUB_API_BASE_URL}/${user.username}`);
            return resp.json();
        });
        const userData = await Promise.allSettled(gitUsersPromises);
        const gitUsers = userData.filter(res => res.status === 'fulfilled').map(res => res.value);
        console.log(gitUsers);
        const images = gitUsers.map(user => {
            const image = new Image();
            image.src = user.avatar_url;
            resultsElem.appendChild(image);
            return image;
        });
        await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        images.forEach(image => {
            image.remove();
        });
    } catch(err) {
        console.log(err);
        resultsElem.innerHTML = `Error: ${err}`
    } finally {
        console.log("Demo finished.");
    }
}()); // IIFE

