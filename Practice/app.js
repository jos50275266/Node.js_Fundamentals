const stream = {
    write: message => {
        console.log(message)
    }
};

console.log(stream.write('kk'));