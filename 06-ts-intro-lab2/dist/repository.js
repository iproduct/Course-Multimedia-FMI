var RepositoryImpl = (function () {
    function RepositoryImpl(idGenerator) {
        this.idGenerator = idGenerator;
        this.entities = new Map();
    }
    RepositoryImpl.prototype.findAll = function () {
        return Array.from(this.entities.values());
    };
    RepositoryImpl.prototype.findById = function (id) {
        return this.entities.get(id);
    };
    RepositoryImpl.prototype.create = function (entity) {
        entity.id = this.idGenerator.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    };
    RepositoryImpl.prototype.update = function (entity) {
        if (!this.findById(entity.id)) {
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    };
    RepositoryImpl.prototype.deleteById = function (id) {
        var old = this.findById(id);
        if (old) {
            this.entities.delete(id);
        }
        return old;
    };
    RepositoryImpl.prototype.count = function () {
        return this.entities.size;
    };
    ;
    return RepositoryImpl;
}());
export { RepositoryImpl };
//# sourceMappingURL=repository.js.map