var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
export var Role;
(function (Role) {
    Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
    Role[Role["MANGER"] = 2] = "MANGER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
var UserImpl = (function () {
    function UserImpl(id, firstName, lastName, email, password, roles, contact) {
        if (roles === void 0) { roles = [Role.CUSTOMER]; }
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    Object.defineProperty(UserImpl.prototype, "salutation", {
        get: function () {
            return "Hello, " + this.firstName + " " + this.lastName + " in roles: " + this.roles.map(function (r) { return Role[r]; }).join(', ');
        },
        enumerable: false,
        configurable: true
    });
    return UserImpl;
}());
export { UserImpl };
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer(id, firstName, lastName, email, password, contact) {
        var _this = _super.call(this, id, firstName, lastName, email, password, [Role.CUSTOMER], contact) || this;
        _this.id = id;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.email = email;
        _this.password = password;
        _this.contact = contact;
        return _this;
    }
    return Customer;
}(UserImpl));
export { Customer };
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager(id, firstName, lastName, email, password, contact) {
        var _this = _super.call(this, id, firstName, lastName, email, password, [Role.MANGER], contact) || this;
        _this.id = id;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.email = email;
        _this.password = password;
        _this.contact = contact;
        return _this;
    }
    return Manager;
}(UserImpl));
export { Manager };
var Admin = (function (_super) {
    __extends(Admin, _super);
    function Admin(id, firstName, lastName, email, password, contact) {
        var _this = _super.call(this, id, firstName, lastName, email, password, [Role.ADMIN], contact) || this;
        _this.id = id;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.email = email;
        _this.password = password;
        _this.contact = contact;
        return _this;
    }
    return Admin;
}(UserImpl));
export { Admin };
//# sourceMappingURL=users.js.map