class Entity {
    // static getNextId() {
    //     return ++nextId;
    // }
    constructor({ id, created, modified }) {
        this.id = id;
        this.created = created || new Date();
        this.modified = modified || new Date();
    }
    toString() {
        return `        id: ${this.id}, 
        created: ${this.created}, 
        modified: ${this.modified}`;
    }
}

export default Entity;

// module.exports = Entity;