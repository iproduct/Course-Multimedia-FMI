import { User } from "./user";
import { IdType } from './shared-types';

export interface UserRepository {
    add(user: User): User;
    edit(user: User): User;
    deleteById(userId: IdType): User | undefined;
    findAll(): User[];
    findById(id: IdType): User | undefined;
    findByEmail(email: string): User | undefined;
    getCount(): number;
}

// interface UserDict{
//     [key: number]: User;
// }
export class MockUserRepository implements UserRepository {
    static nextId : IdType;
    private entities = new Map<IdType, User>();
    add(user: User): User {
        const found = this.findByEmail(user.email);
        if(found) {
            throw Error(`User with Email="${user.email} already exists.`)
        }
        user.id = this.getNextId();
        this.entities.set(user.id, user);
        return user;
    }
    edit(user: User): User {
        if(!user.id) {
            throw Error(`User ID can not be undefined.`)
        }
        const found = this.findById(user.id);
        if(found && found.email !== user.email) {
            throw Error(`User ID="${user.id}: E-mail can not be modified.`)
        }
        this.entities.set(user.id, user);
        return user;
    }
    deleteById(userId: number): User | undefined {
        const found = this.findById(userId);
        this.entities.delete(userId);
        return found;
    }
    findAll(): User[] {
        return Array.from(this.entities.values());
    }
    findById(id: IdType): User | undefined {
        return this.entities.get(id);
    }
    findByEmail(email: string): User | undefined{
        return this.findAll().find(user => user.email === email);
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