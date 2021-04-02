export class MockRepository {
    constructor() {
        this.entities = new Map();
    }
    add(entity) {
        entity.id = this.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    edit(entity) {
        if (!entity.id) {
            throw Error(`Entity ID can not be undefined.`);
        }
        const found = this.findById(entity.id);
        if (!found) {
            throw Error(`Entity ID="${entity.id} does not exist and can not be modified.`);
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id) {
        const found = this.findById(id);
        this.entities.delete(id);
        return found;
    }
    findAll() {
        return Array.from(this.entities.values());
    }
    findById(id) {
        return this.entities.get(id);
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
export class MockUserRepository extends MockRepository {
    add(user) {
        const found = this.findByEmail(user.email);
        if (found) {
            throw Error(`User with Email="${user.email} already exists.`);
        }
        return super.add(user);
    }
    edit(user) {
        if (!user.id) {
            throw Error(`User ID can not be undefined.`);
        }
        const found = this.findById(user.id);
        if (found && found.email !== user.email) {
            throw Error(`User ID="${user.id}: E-mail can not be modified.`);
        }
        return super.edit(user);
    }
    findByEmail(email) {
        return this.findAll().find(user => user.email === email);
    }
}
export class MockBlogRepository extends MockRepository {
}
export class MockCommentRepository extends MockRepository {
}
