export class RepositoryImpl {
    constructor() {
        this.entities = new Map();
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    create(entity) {
        entity.id = this.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity) {
        const found = this.entities.get(entity.id);
        if (found) {
            this.entities.set(entity.id, entity);
            return entity;
        }
        else {
            return undefined;
        }
    }
    deleteById(id) {
        const found = this.entities.get(id);
        if (found) {
            this.entities.delete(id);
            return found;
        }
        else {
            return undefined;
        }
    }
    getNextId() {
        return ++RepositoryImpl.nextId;
    }
    *[Symbol.iterator]() {
        const array = Array.from(this.entities.values());
        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    }
}
RepositoryImpl.nextId = 0;
//# sourceMappingURL=repository.js.map