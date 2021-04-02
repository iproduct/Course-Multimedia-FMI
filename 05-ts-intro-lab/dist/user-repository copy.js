// interface UserDict{
//     [key: number]: User;
// }
export class MockUserRepository {
    constructor() {
        this.entities = new Map();
    }
    add(user) {
        const found = this.findByEmail(user.email);
        if (found) {
            throw Error(`User with Email="${user.email} already exists.`);
        }
        user.id = this.getNextId();
        this.entities.set(user.id, user);
        return user;
    }
    edit(user) {
        if (!user.id) {
            throw Error(`User ID can not be undefined.`);
        }
        const found = this.findById(user.id);
        if (found && found.email !== user.email) {
            throw Error(`User ID="${user.id}: E-mail can not be modified.`);
        }
        this.entities.set(user.id, user);
        return user;
    }
    deleteById(userId) {
        const found = this.findById(userId);
        this.entities.delete(userId);
        return found;
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
    }
    findByEmail(email) {
        return this.findAll().find(user => user.email === email);
    }
    getCount() {
        return this.entities.size;
    }
    // Implementation details
    getNextId() {
        if (!MockUserRepository.nextId) {
            MockUserRepository.nextId = 0;
        }
        return ++MockUserRepository.nextId;
    }
}
