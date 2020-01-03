# Asynchronous JavaScript

1. Callback-Based-Approach
- callback hell

```javascript
console.log('Before');

getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits)
        })
    })
})

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API..');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit'])
        }, 2000)
    })
}



console.log('After');

// Then or Catch chaining을 안해줘서 첫번째 resolve에서 return과 같이 시스템 종료됨
```

2. Promise-Based-Approach
- return Promise
- resolve/reject --> then/catch
- Promise.All: A, B, C, 가 순서대로 비동기 방식으로 실행되어도 셋 중 먼저 event loop를 타고 callstack에서 실행된 순서대로 배열에 담김, 단 셋 중 한 곳에서 에러가 발생하면 올 스탑.
- Promise.race: 두 개의 비동기가 실행되었을때 먼저 완료된 결과만 출력

```javascript
console.log('Before');

getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(err => console.log(new Error(err)))


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API..');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit'])
        }, 2000)
    })
}

console.log('After');
```

3. Async/Await
- Promise Based
- return void, not undefined
- instead of resolve/reject, use try/catch
- async는 함수는 promise를 return 값으로 가진다는 것을 의미한다.

```javascript
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos[0]);
        console.log(commits);

    }

    catch (err) {
        console.log('Error', err.message);
    }
}

displayCommits();

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
            //      resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'))
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

```