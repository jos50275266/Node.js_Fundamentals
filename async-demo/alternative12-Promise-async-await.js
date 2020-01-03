// async and await의 경우 catch/then을 사용하지 않기 때문에 오류 검사시에
// try/catch 문을 대안으로 사용한다.

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

// 결과
// Before
// After
//'Reading a user from a database...'
//'Calling GitHub API...'
// Error Could not get the repos.