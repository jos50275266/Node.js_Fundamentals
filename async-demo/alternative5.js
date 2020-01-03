// const p = getUser(1);
// p.then(user => console.log(user));

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'su' });
        })
    })
}

getUser(1).then(user => console.log(user));

