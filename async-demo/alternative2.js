/* 
Promise (Asynchronous Operation):
- resolve: fulfilled
- reject: failed or error occurred

3 Phrases of Promise (Asynchronous Operation)
1. pending 
2. resolve (fulfilled) or reject

Promise
1. object이다
2. 사용시 Constructor을 생성하고, 하나의 argument를 받도록해야한다

Resolve 값을 받는법
then vs catch
1. then: argument로 함수를 전달 받는다 
2. catch: argument로 error message를 전달받는다.
*/

const usageOfPromiseOperationThen = new Promise((resolve, reject) => {
    resolve(1);
})

usageOfPromiseOperationThen.then(result => console.log(`Result ${result}`))

// 위 방식으로 그냥 reject("error message")도 괜찮지만, new Error와 같은 객체를 사용하는 것이 권장된다
// new Error로 error 처리를 하면 call-stack을 듸워주기 때문이다.
https://stackoverflow.com/questions/591857/how-can-i-get-a-javascript-stack-trace-when-i-throw-an-exception
const usageOfPromiseOperationCatch = new Promise((resolve, reject) => {
    reject(new Error('message'));
})

usageOfPromiseOperationCatch.catch(error => console.log(`error ${error}`))

// 이번에는 then/catch를 chaining 해보자
const usageOfPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('message'));
    }, 2000)
})

usageOfPromise
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err))