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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { RepositoryImpl } from "./repository";
var UserRepositoryImpl = (function (_super) {
    __extends(UserRepositoryImpl, _super);
    function UserRepositoryImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRepositoryImpl.prototype.findByEmail = function (email) {
        var e_1, _a;
        var users = this.entities.values();
        try {
            for (var users_1 = __values(users), users_1_1 = users_1.next(); !users_1_1.done; users_1_1 = users_1.next()) {
                var user_1 = users_1_1.value;
                if (user_1.email === email) {
                    return user_1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (users_1_1 && !users_1_1.done && (_a = users_1.return)) _a.call(users_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    return UserRepositoryImpl;
}(RepositoryImpl));
export { UserRepositoryImpl };
//# sourceMappingURL=user-repository.js.map