
export class ApiClient {
    constructor(collection) {
        this.collection = collection;
    }

    findAll() {
        return fetch(`http://localhost:9000/api/${this.collection}`)
            .then(postsResp => postsResp.json())
    }

    create(entity) {
        return fetch(`http://localhost:9000/api/${this.collection}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        })
            .then(postResp => postResp.json())
    }

    deleteById(id) {
        return fetch(`http://localhost:9000/api/${this.collection}/${id}`, {
            method: 'DELETE'
        })
            .then(postResp => postResp.json())
    }

    async handleRequest(url, options){
        try {
            const postsResp = await fetch(url, options);
            if(postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch(err) {
            return Promise.reject(err)
        }
    }
}