// 1. 이름을 받고
// 2. 받았다면
// 3. 반을 받고
// 4. 받았다면
// 5. repo를 받고
// 6. 출력


name('su', (name) => {
    console.log('name: ', name)
    console.log(name)
    course('computer science', (course) => {
        console.log('course: ', course)
        console.log(course)
        repositories('Github', (github) => {
            console.log('github:', github)
            console.log([name, course, github])
            const collection = [name, course, github]
            console.log(collection[0]);
            console.log(collection[1]);
            console.log(collection[2]);
        })
    })
})



function name(name, callback) {
    setTimeout(() => {
        console.log('이름을 받습니다.')
        callback({ name: name });
    }, 2000)
}

function course(course, callback) {
    setTimeout(() => {
        console.log('반을 받습니다.');
        callback({ course: course })
    }, 2000)
};

function repositories(repo, callback) {
    setTimeout(() => {
        console.log('Repo를 받습니다.')
        callback({ repo: repo })
    })
}

function output(output) {
    console.log(output)
}