export class NumberIdGenerator {
    constructor() {
        this.nextId = 0;
    }
    getNextId() {
        return ++this.nextId;
    }
}
export class RepositoryImpl {
    constructor(idGen) {
        this.idGen = idGen;
        this.entites = new Map();
    }
    findAll() {
        return Array.from(this.entites.values());
    }
    findById(id) {
        return this.entites.get(id);
    }
    create(entity) {
        const id = this.idGen.getNextId();
        entity.id = id;
        this.entites.set(id, entity);
        return entity;
    }
    update(entity) {
        if (this.entites.get(entity.id)) {
            this.entites.set(entity.id, entity);
            return entity;
        }
        return undefined;
    }
    deleteById(id) {
        const deleted = this.findById(id);
        if (deleted) {
            this.entites.delete(id);
        }
        return deleted;
    }
    get size() {
        return this.entites.size;
    }
}
//# sourceMappingURL=repository.js.map