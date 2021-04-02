import { UserRepository } from './user-repository';
import { IdType } from './shared-types.js';
import { User } from './user.js';
import { Indentifiable } from './shared-types.js';
import { Blog } from './blogs';

export interface Repository<T extends Indentifiable> {
    add(user: T): T;
    edit(user: T): T;
    deleteById(id: IdType): T | undefined;
    findAll(): T[];
    findById(id: IdType): T | undefined;
    getCount(): number;
}

export class MockRepository<T extends Indentifiable> implements Repository<T> {
    static nextId : IdType;
    private entities = new Map<IdType, T>();
    add(entity: T): T {
        entity.id = this.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    edit(entity: T): T {
        if(!entity.id) {
            throw Error(`Entity ID can not be undefined.`)
        }
        const found = this.findById(entity.id);
        if(!found) {
            throw Error(`Entity ID="${entity.id} does not exist and can not be modified.`)
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType): T | undefined {
        const found = this.findById(id);
        this.entities.delete(id);
        return found;
    }
    findAll(): T[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): T | undefined {
        return this.entities.get(id);
    }
   
    getCount(): number {
        return this.entities.size;
    }

    // Implementation details
    private getNextId(): IdType {
        if(!MockUserRepository.nextId) {
            MockUserRepository.nextId = 0;
        }
        return ++MockUserRepository.nextId;
    }
    
}

export class MockUserRepository extends MockRepository<User> implements UserRepository {
    add(user: User): User {
        const found = this.findByEmail(user.email);
        if(found) {
            throw Error(`User with Email="${user.email} already exists.`);
        }
       return super.add(user);
    }
    edit(user: User): User {
        if(!user.id) {
            throw Error(`User ID can not be undefined.`)
        }
        const found = this.findById(user.id);
        if(found && found.email !== user.email) {
            throw Error(`User ID="${user.id}: E-mail can not be modified.`)
        }
       return super.edit(user);

    }
    findByEmail(email: string): User | undefined{
        return this.findAll().find(user => user.email === email);
    }
}

export class MockBlogRepository extends MockRepository<Blog> {
}

export interface Comment extends Indentifiable{}

export class MockCommentRepository extends MockRepository<Comment> {
}