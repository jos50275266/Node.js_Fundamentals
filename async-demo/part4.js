// callback: Async 코드의 동작이 준비가 되었을 떄 우리가 호출할 수 있는 함수
console.log('Before');
getUser(1, (user) => {
    console.log('User', user)
})
console.log('After');
getSu(1, arr => {
    console.log(arr, 'is an array')
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUserName: 'su' })
    }, 2000);
}

function getSu(arr, callback) {
    setTimeout(() => {
        console.log('This is a second function!');
        callback({ arr: arr })
    })
}

/*
Before
After
This is a second function!
[1,2,3] is an array
Reading a user from a database
User id: 1, gitHubUserName: 'su'
*/

