export interface Repository<K, E>{
    findAll(): E[];
    findById(id: K): E | null;
    create(entity: E): E;
    update(entity: E): E;
    deleteById(id: K): E | null;
    count(): number;
}

export class RepositoryImpl<K, E> implements Repository<K, E> {
    constructor(){}
    findAll(): E[] {
        throw new Error("Method not implemented.");
    }
    findById(id: K): E | null {
        throw new Error("Method not implemented.");
    }
    create(entity: E): E {
        throw new Error("Method not implemented.");
    }
    update(entity: E): E {
        throw new Error("Method not implemented.");
    }
    deleteById(id: K): E | null {
        throw new Error("Method not implemented.");
    }
    count(): number {
        throw new Error("Method not implemented.");
    }
}