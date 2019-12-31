function sayHello(name) {
  console.log("Hello " + name);
}

sayHello("Su");

// node app.js
// app.js File --> V8(C++) thorugh Node For execution --> Hello Su

// In Node, we don't have window or document objects!
console.log(window); // Error