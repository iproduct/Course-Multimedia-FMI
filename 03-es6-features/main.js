async function init() {
    try {
      const userResult = await fetch("users.json");
      const user = await userResult.json();
      const gitResp = await fetch(`http://api.github.com/users/${user[0].name}`);
      const githubUser = await gitResp.json();
      const img = new Image();
      img.src = githubUser.avatar_url;
      document.body.appendChild(img);
      await new Promise((resolve, reject) => setTimeout(resolve, 6000));
      img.remove();
      console.log("Demo finished.");
    } catch (err) {
      console.log(err);
    }
  }