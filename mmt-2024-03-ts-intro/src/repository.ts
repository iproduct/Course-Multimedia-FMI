import { Identifiable, IdType } from "./common-types";

export interface IdGenerator<K> {
    getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
    private nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }
}

export interface Repository<K, T extends Identifiable> {
    findAll(): T[];
    findById(id: K): T | undefined;
    create(entity: Omit<T, 'id'>): T;
    update(entity: T): T | undefined;
    deleteById(id: K): T | undefined;
    readonly size: number;
}

export class RepositoryImpl<K, T extends Identifiable<K>> implements Repository<K, T> {
    private entites = new Map<K, T>();
    constructor(private idGen: IdGenerator<K>) { }
    findAll(): T[] {
        return Array.from(this.entites.values());
    }
    findById(id: K): T | undefined {
        return this.entites.get(id);
    }
    create(entity: Omit<T, "id">): T {
        const id = this.idGen.getNextId();
        (entity as T).id = id;
        this.entites.set(id, entity as T);
        return entity as T;
    }
    update(entity: T): T | undefined {
        if (this.entites.get(entity.id)) {
            this.entites.set(entity.id, entity);
            return entity;
        }
        return undefined;
    }
    deleteById(id: K): T | undefined {
        const deleted = this.findById(id);
        if(deleted) {
            this.entites.delete(id);
        }
        return deleted;
    }
    get size() {
        return this.entites.size;
    }

}