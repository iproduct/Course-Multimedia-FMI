
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
}