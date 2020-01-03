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

// Then or Catch chaining을 안해줘서 첫번째 resolve에서 return과 같이 시스템 종료됨