const bob = {
    name: 'Bob',
    friends: ['Alice', 'Jane'],
    printFriends() {
        console.log(
            this.friends.map(
                f => ({ message: `${this.name} knows ${f}` })
            )
        );
    }
}

bob.printFriends();