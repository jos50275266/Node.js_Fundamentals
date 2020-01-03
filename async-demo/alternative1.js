//Named Function to Rescue
console.log('Before');
getUser(1, 'su', getRepositories);
console.log('After')

function getCommits(repos) {
    setTimeout(() => {
        console.log(`repositories: ${repos}`);
        console.log(typeof repos);
        // object literal시 [object object]로 변환됨
        // 문자열 인터폴레이션은 ${ … }으로 표현식을 감싼다. 문자열 인터폴레이션 내의 표현식은 문자열로 강제 타입 변환된다.
        // https://poiemaweb.com/es6-template-literals
        console.log(`${repos}`)
        // [object object]
        // https://stackoverflow.com/questions/34264800/node-js-function-return-object-object-instead-of-a-string-value
        // key: value의 객체 형태로 나왔기 때문에 JSON.stringify로 string 형태로 볼 수 있다.
        displayCommits(repos);
    })
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, username) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        console.log({ id: id, gitHubUserName: username });
        getRepositories({ id: id, gitHubUserName: username }, getCommits)
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        console.log('Here', username);
        callback(username)
    }, 2000)
}

// Before
