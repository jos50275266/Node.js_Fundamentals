console.log('Before')
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return { id: id, gitHubUserName: 'su' }
    }, 2000)
}


/*
Before
underfined
After
Reading a user from a database
*/

//Stack                                       // WebAPI
console.log('Before')                         // getUser(id) 함수 실행
console.log(user)
console.log('After')

