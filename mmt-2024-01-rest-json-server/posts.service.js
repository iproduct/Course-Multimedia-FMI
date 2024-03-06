const BASE_SERVICE_URL = "http://localhost:3000/api";

class PostsService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getAllPosts() {
        const postsResp = await fetch(`${BASE_SERVICE_URL}/posts/`);
        return postsResp.json();
    }
}

export default new PostsService(BASE_SERVICE_URL);