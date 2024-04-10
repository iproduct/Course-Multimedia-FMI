export class Entity {
    constructor(id){
        this.id = id;
    }
    toString() {
        return `Entity with ID: ${this.id}`;
    }
}