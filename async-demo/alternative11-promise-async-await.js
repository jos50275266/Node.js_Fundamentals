/*
Promise-based approach 방식을 조금 더 동기적 방식으로 표현할 수 있는 Syntatical Sugar를
Async and Await Approach라고 부른다.

우선 Await Operator는 Promise를 return 해주는 함수에서만 사용이가능하다.
예를 들면, const a = 비동기 함수, 라고 했을때 원래 a라는 변수에는 비동기 함수가 담길 수 없다
하지만 그 앞에 await operator를 붙여주면 마치 비동기 함수인 것 처럼 동작한다.
예를들면, const user = await 비동기함수(1)는 일반함수와 달리 모든 비동기 함수의 동작이
다 끝날 때까지 기다리고 마치 일반 함수를 호출해 리턴한 값을 할당하는 것 처럼 동작한다.
*/

// console.log('Before')
// const user = await getUser(1);
// const repos = await getRepositories(user);
// const commits = await getCommits(repos[0]);
// console.log(commits);
// console.log('After')


function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work 
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}

// await operator를 사용했을 때의 장점은 우리가 조금 더 callback과 promise에 비해 읽고 이해하기가 용이하고, 
// 비동기적 동작을 마치 동기적으로 동작하는 것처럼 보여준다는 점이고, 
// 하나 더 추가하자면, promise에서 사용했던 then and catch chain을 사용할 필요가 없다는 점입니다.

// 그럼 async는 어디에 사용되는 것인가요? 우리가 함수 안에서 await operator를 사용할 때마다
// 우리는 이 함수명은 async modifier로 꾸며 줘여합니다. 
// 즉, 자바스크립트 엔진은 우리가 함수안에서 await을 사용할때마다, 반드시 이 함수를 async로 꾸며줘야합니다.

// 위 코드는 현재 async keyword가 없이 때문에 동작하지 않는다.

console.log('Before')

async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepositories(user);
    const commits = await getCommits(repos[0]);
    console.log(commits);
}

displayCommits();
console.log('After')

/*
함수 안에 await을 사용할 때 async를 사용해야하는 이유
1. 항상 promise를 return 함을 명시하기위해.

2. 만일 한 함수가 Non-Promise를 리턴해줘도 async가 앞에 붙어있으면 JS Engine은
자동으로 return 해주는 값을 resolve promise 감싸서 리턴하는 역할을 한다.

3. VSCode에서 displayCommits() 에 마우스를 대면 return type이 void라 나온다.
이것은 promise를 이미 return 하고 난 뒤 어떠한 것도 return 할 것이 없기 때문이다.
만일 return 값이 promise가 아닌 경우 void가 아닌 undefined이 나온다.
요약: promise가 있어야먄 return 할 것이 없을때 void를 return한다.
하지만, 내부적으로는 promise-based approach와 동일하게 동작한다.
*/