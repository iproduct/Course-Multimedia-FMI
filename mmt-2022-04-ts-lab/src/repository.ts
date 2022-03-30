import { EntityNotFoundException } from "./exceptions.js";

export interface Identifiable<K> {
    id: K;
}

export interface Repository<K, E extends Identifiable<K>>{
    findAll(): E[];
    findById(id: K): E | undefined;
    create(entity: E): E;
    update(entity: E): E;
    deleteById(id: K): E | undefined;
    count(): number;
}

export interface IdGenerator<K> {
    getNextId(): K;
}

export class RepositoryImpl<K, E extends Identifiable<K>> implements Repository<K, E> {
    private entities = new Map<K, E>();
    constructor(private idGen: IdGenerator<K>){}
    findAll(): E[] {
        return Array.from(this.entities.values());
    }
    findById(id: K): E | undefined {
        return this.entities.get(id);
    }
    create(entity: E): E {
        entity.id = this.idGen.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: E): E {
        const old = this.findById(entity.id);
        if(!old) {
            throw new EntityNotFoundException(`Entity with ID='${entity.id}' not found.`);
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: K): E | undefined {
        const old = this.findById(id);
        this.entities.delete(id);
        return old;
    }
    count(): number {
        return this.entities.size;
    }
}