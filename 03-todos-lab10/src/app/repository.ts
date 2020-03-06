export type IdType = number;

export interface Identifiable {
    id: IdType;
}

export interface EntityByIdGetter<T extends Identifiable> {
    (id: IdType): T | undefined;
}

export interface Repository<T extends Identifiable> extends Iterable<T> {
    findAll(): T[];
    findById: EntityByIdGetter<T>;
    create(entity: T): T;
    update(entity: T): T | undefined;
    deleteById: EntityByIdGetter<T>;

}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    private static nextId = 0;
    private entities = new Map<IdType, T>();
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): T | undefined {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = this.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T | undefined {
        const found = this.entities.get(entity.id);
        if (found) {
            this.entities.set(entity.id, entity);
            return entity;
        } else {
            return undefined;
        }

    }
    deleteById(id: IdType): T | undefined {
        const found = this.entities.get(id);
        if (found) {
            this.entities.delete(id);
            return found;
        } else {
            return undefined;
        }
    }

    private getNextId(): IdType {
        return ++RepositoryImpl.nextId;
    }

    // [Symbol.iterator]() {
    //     let index = 0;
    //     const array = Array.from(this.entities.values());
    //     return {
    //         next() {
    //             return {done: index >= array.length, value: array[index++]};
    //         }
    //     }
    // }

    * [Symbol.iterator]() {
        const array = Array.from(this.entities.values());
        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    }

}
//
