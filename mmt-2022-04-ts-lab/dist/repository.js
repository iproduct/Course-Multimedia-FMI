import { EntityNotFoundException } from "./exceptions.js";
export class RepositoryImpl {
    constructor(idGen) {
        this.idGen = idGen;
        this.entities = new Map();
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    create(entity) {
        entity.id = this.idGen.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity) {
        const old = this.findById(entity.id);
        if (!old) {
            throw new EntityNotFoundException(`Entity with ID='${entity.id}' not found.`);
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id) {
        const old = this.findById(id);
        this.entities.delete(id);
        return old;
    }
    count() {
        return this.entities.size;
    }
}
//# sourceMappingURL=repository.js.map