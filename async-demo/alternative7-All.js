// Promise All -->In Parallel Structure
// Promise는 chaining 했을때 하나가 실행되고 그 다음에 실행다는 비동기 이짐나 마치 동기인 것 처럼 동작하는 반면에
// Promise All의 경우 먼저 시작하는 것은 있어도 먼저 시작한 것이 완료되든 안되든 상관없이
// 바로 다음 것으로 넘어가 실행하고 먼저 결과값이 resolve된 것을 차례로 배열에 담는다.
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Operation 1...');
        resolve(1);
    }, 2000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Operation 2...');
        resolve(2);
    })
})


Promise.all([p1, p2])
    .then(result => console.log(result));