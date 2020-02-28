function greeter(person: string) {
    return "<h2>Hello, " + person + " from TypeScript!</h2>";
}

let user = "Jane";

document.getElementById("content")!.innerHTML = greeter(user);