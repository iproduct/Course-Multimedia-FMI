// 'use strict';

var bob = {
    name: "Bob",
    friends: ["Alice", "Jane"],
    printFriends() {
      this.friends.forEach(f => console.log(this.name + " knows " + f));
    }
  }
  bob.printFriends();