// 여러 개의 비동기 동작이 거의 동시에 동작을 시작하고 
// 단 하나의 동작이라도 완료가되는 순간 어떤 행위를 하고 싶은 경우에 어떻게 해야 하는가? 
// 이때 우리는 promise.race를 이용할 수 있다. 코드로 보자면,
// 기억하기 쉽게 비동기로 동작하는 애들끼지 누가 먼저 event loop를 타고 call stack으로 올라오는가
// 에 대해 경주하는 것 이다.

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async Operation 1...');
        resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asnyc Operation 2...');
        resolve(2);
    }, 1000);
})

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

/*
현재, promise p1과 p2가 거의 동시에 비동기 동작을 시작했다.
하지만, race를 사용했기 때문에, p1이 동작이 끝나자마자 p1의 resolve 결과만
배열이 아닌 보통 값으로 리턴을해준다.
즉, race는 여러개의 promise를 거의 동시에 동작시킬 수 있지만 하나라도 동작이 끝난 promise가 발생하면 모든 promise가 끝이 났다고 간주하고,
가장먼저 끝이난 한 동작의 resolve값을 return해준다(단, 전제는 성공적으로 오류 없이 동작이 끝이 났을 때).

Result
'Async Operation 1...'
'Async Operation 2...'
2
*/