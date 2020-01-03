const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Operation 1...');
        reject(new Error('because something failed!'))
    }, 2000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Operation 2...');
        resolve(2);
    }, 2000)
})

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message))

/*
여기서 주목할 점은 promise.all을 사용했을 때 여러개의 promise 중 단 하나라도 에러가있다면,
 promise.all은 모든 promise에 에러가 있는 것으로 간주한다는 점이다.
*/
