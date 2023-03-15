
export class ApiClient {
    constructor(collection) {
        this.collection = collection;
    }

    findAll() {
        return handleRequest(`http://localhost:9000/api/${this.collection}`);
    }

    create(entity) {
        return handleRequest(`http://localhost:9000/api/${this.collection}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }

    deleteById(id) {
        return handleRequest(`http://localhost:9000/api/${this.collection}/${id}`, {
            method: 'DELETE'
        });
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