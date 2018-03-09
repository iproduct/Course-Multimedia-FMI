"use strict";

var i;
for (i = 0; i < 10; i++) {
  setTimeout(
    (function f(j) {
      return function() {
        console.log(j);
      };
    })(i),
    i * 1000
  );
}
