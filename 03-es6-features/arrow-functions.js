'use strict';

var bob = {
  name: "Bob",
  friends: ["Alice", "Jane"],
  printFriends() {
    this.friends.forEach(fr => console.log(this.name + " knows " + fr ));
  }
}
bob.printFriends();