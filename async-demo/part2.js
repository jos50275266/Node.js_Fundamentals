// Async
// #1 - Sync
console.log('Before');

// #2 - Async
setTimeout(() => {         
    console.log('This is Async Function')
}, 2000)

// #3 - Sync
console.log('After');


/*
#1 - Sync 출력
#2 - Async --> Web APIs --> After two seconds --> callback queue -->
--> Event loop keeps checking if call stack is empty or not --> if so --> event in callback queue executes its event to callstack
#3 - Sync 출력

As a result: Before -> After -> This is Async Function!
*/

