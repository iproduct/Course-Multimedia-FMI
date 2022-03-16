class ClassWithPrivateField {
  #privateField = 123;
  #getPrivateField() {
    return this.#privateField;
  }
  print() {
    console.log(this.#getPrivateField())
  }
}

class ClassWithPrivateMethod {
  #privateMethod() {
    return 'hello world';
  }
}

class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD;
}

class ClassWithPrivateStaticMethod {
  static #privateStaticMethod() {
    return 'hello world';
  }
}

const pfc1 = new ClassWithPrivateField();
pfc1.print()