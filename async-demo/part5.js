console.log('Before');
getUser(1, 'su', (user) => {
    getRepositories(user, (repos) => {
        console.log(user);
        getCommits(repos)
    })
})

console.log('After');

function getUser(id, name, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUserName: name })
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling Github API..');
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
}

function getCommits(repos) {
    console.log(repos);
}