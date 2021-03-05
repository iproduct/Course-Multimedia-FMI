// const Entity = require('../common/entity');
import Entity from '../common/entity.js';

class User extends Entity {
    status = 'active';
    constructor(firstName, lastName, username, password, role, gender, imageUrl, info) {
        super({});
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.gender = gender;        
        this.role = role;
        this.imageUrl = imageUrl;
        this.info = info;
    }
    toString() {
        return `${super.toString()}, 
        first: ${this.firstName}, 
        last: ${this.lastName}, 
        username: ${this.username}, 
        password: ${this.password}, 
        gender: ${this.gender}, 
        imageUrl: ${this.imageUrl}, 
        info: ${this.info}, 
        status: ${this.status}`;
    }
}

export default User;
// module.exports = User;