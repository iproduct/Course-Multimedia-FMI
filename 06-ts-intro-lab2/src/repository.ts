export type IdType = number | undefined;

export interface Identifiable {
    id: IdType;
}

export interface IdGenerator {
    getNextId(): IdType;
}

export class NumberIdGenerator implements IdGenerator{
    static nextId = 0;
    getNextId(): number {
        return ++ NumberIdGenerator.nextId;
    }
}

interface EntityByIdGetter<T extends Identifiable> {
    (id: IdType): T | undefined;
}

export  interface Repository<T extends Identifiable> {
    findAll(): T[]; //Array<T>
    findById: EntityByIdGetter<T> //findById(id: IdType): T | undefined;
    create(entity: T): T;
    update(entity: T): T | undefined;
    deleteById: EntityByIdGetter<T>;
    count: () => number; // count(): number;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    constructor(protected idGenerator: IdGenerator){}
    protected entities = new Map<IdType, T>();

    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType):  T | undefined {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = this.idGenerator.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T | undefined {
        if(!this.findById(entity.id)) {
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType):  T | undefined {
        const old = this.findById(id);
        if(old) {
            this.entities.delete(id);
        }
        return old;
    }
    count() {
        return this.entities.size;
    };

}