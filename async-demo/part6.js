console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUserName);
const commits = getCommits(repos[0]);
console.log('After');


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUserName: 'su' })
    })
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API..');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

// 위 코드의 문제점
// 1. 동기적으로 위와 같이 동작시키면, 가독성에 좋아 보이지만,
// 데이터베이스와 같이 비동기적으로 동작하는 방식에 부적합하다 왜냐하면
// 데이터를 가져오는 동작이 완료되고난 후 다른 동작이 실행되어야하는데 현재 위 코드는
// 순차적으로 바로 실행됨으로 인해 적절히 데이터베이스의 자료를 못가지고 오기 때문이다.